import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryAttribute } from '@models/category.model';
import { AttributeCombination, Variation } from '@models/index';
import { getCurrentProd } from 'app/state/selectors/currentProd.selector';
import { updateCurrentProd } from 'app/state/actions/currentProd.actions';

@Component({
  selector: 'app-variations-table',
  templateUrl: './variations-table.component.html',
  styleUrls: ['./variations-table.component.scss'],
})
export class VariationsTableComponent implements OnInit {
  // @Input() combAttributes: CategoryAttribute[] = [];
  variations: Variation[] = [];
  attributes: CategoryAttribute[] = [];
  atribProdVariations: string[] = [];
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select(getCurrentProd).subscribe((data) => {
      if (data.variations && data.category) {
        this.variations = JSON.parse(JSON.stringify(data.variations));
        this.attributes = data.category?.attributes.filter((attribute) =>
          attribute.tags?.hasOwnProperty('allow_variations')
        );
      }
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
      updateCurrentProd({
        property: { variations: this.variations },
      })
    );
  }
}
