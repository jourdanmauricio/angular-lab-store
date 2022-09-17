import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { ICatAttribute } from '@models/index';
import { IVariation } from '@models/index';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { Dialog } from '@angular/cdk/dialog';
import { VarAttributesComponent } from '../var-attributes/var-attributes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-variations-table',
  templateUrl: './variations-table.component.html',
  styleUrls: ['./variations-table.component.scss'],
})
export class VariationsTableComponent implements OnInit {
  variations: IVariation[] = [];
  attributes: ICatAttribute[] = [];
  atribProdVariations: string[] = [];
  constructor(private store: Store, private dialog: MatDialog) {}

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

  openAttib(variation: IVariation) {
    const dialogRef = this.dialog.open(VarAttributesComponent, {
      minHeight: '250px',
      width: '800px',
      data: variation,
    });

    dialogRef.afterClosed().subscribe((variation) => {
      if (variation) {
        this.updateVariation(variation);
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
      new CurrentProdUpdate({
        property: 'variations',
        value: this.variations,
      })
    );
  }

  changeSku(e: Event, variation: IVariation) {
    const value = (e.target as HTMLInputElement).value;
    let found = variation.attributes.find((sku) => sku.id === 'SELLER_SKU');
    if (found) {
      found.value_name = value;
    } else {
      let obj = {
        id: 'SELLER_SKU',
        name: 'SKU',
        value_id: null,
        value_name: value,
      };
      variation.attributes.push(obj);
    }
    variation.updated = true;

    this.updateVariation(variation);
  }

  changeQuantity(e: Event, variation: IVariation) {
    const value = (e.target as HTMLInputElement).value;
    variation.available_quantity = parseInt(value);
    variation.updated = true;

    this.updateVariation(variation);
  }

  updateVariation(variation: IVariation) {
    let newVariations = this.variations.map((vari) =>
      vari.id === variation.id ? variation : vari
    );

    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'variations',
        value: newVariations,
      })
    );
  }
}
