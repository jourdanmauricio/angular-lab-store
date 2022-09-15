import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormControl, Validators } from '@angular/forms';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.scss'],
})
export class SkuComponent implements OnInit {
  sku = new FormControl('', [Validators.required]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod.seller_custom_field) this.sku.setValue(prod.seller_custom_field);
    });
  }

  change() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'seller_custom_field',
        value: this.sku.value,
      })
    );
  }
}
