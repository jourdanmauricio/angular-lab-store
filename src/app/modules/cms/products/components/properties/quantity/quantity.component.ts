import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
})
export class QuantityComponent implements OnInit {
  available_quantity: number = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod) {
        this.available_quantity = prod.available_quantity;
      }
    });
  }

  changeQuantity() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'available_quantity',
        value: this.available_quantity,
      })
    );
  }
}
