import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit {
  price: number = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod) {
        this.price = prod.price;
      }
    });
  }

  changePrice() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'price',
        value: this.price,
      })
    );
  }
}
