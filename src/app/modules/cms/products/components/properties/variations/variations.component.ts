import { Component, OnInit } from '@angular/core';
import { IVariation } from '@models/index';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { getQuantityFromVariations } from 'app/utils/functions';

@Component({
  selector: 'app-variations',
  templateUrl: './variations.component.html',
  styleUrls: ['./variations.component.scss'],
})
export class VariationsComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  onUpdateVariations(variations: IVariation[]) {
    const available_quantity = getQuantityFromVariations(variations);

    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'variations',
        value: variations,
      })
    );
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'available_quantity',
        value: available_quantity,
      })
    );
  }
}
