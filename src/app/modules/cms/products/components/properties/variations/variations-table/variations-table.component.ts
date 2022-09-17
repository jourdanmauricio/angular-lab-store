import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { ICatAttribute } from '@models/index';
import { IVariation } from '@models/index';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';

@Component({
  selector: 'app-variations-table',
  templateUrl: './variations-table.component.html',
  styleUrls: ['./variations-table.component.scss'],
})
export class VariationsTableComponent implements OnInit {
  variations: IVariation[] = [];
  attributes: ICatAttribute[] = [];
  atribProdVariations: string[] = [];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod.variations)
        this.variations = JSON.parse(JSON.stringify(prod.variations));
      if (prod.category)
        this.attributes = prod.category.attributes.filter((attribute: any) =>
          attribute.tags?.hasOwnProperty('allow_variations')
        );
    });
  }

  combAttributes() {
    return this.variations[0].attribute_combinations.map(
      (attribute) => attribute
    );
  }

  sku(id: number | string) {
    let sku: string | null | undefined = '';
    if (this.variations) {
      let variation = this.variations.find((variation) => variation.id === id);
      if (variation?.attributes) {
        let atribSku = variation.attributes.find(
          (atrib) => atrib.id === 'SELLER_SKU'
        );
        if (atribSku) sku = atribSku.value_name;
      }
    }
    return sku;
  }

  delVar(id: number | string) {
    const index = this.variations.findIndex((vari) => vari.id === id);

    this.variations.splice(index, 1);

    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'variations',
        value: this.variations,
      })
    );
  }
}
