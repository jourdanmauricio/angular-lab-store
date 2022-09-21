import { Component, OnInit } from '@angular/core';
import { ISaleTerms } from '@models/product/ISaleTerms';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-purchase-max-quantity',
  templateUrl: './purchase-max-quantity.component.html',
  styleUrls: ['./purchase-max-quantity.component.scss'],
})
export class PurchaseMaxQuantityComponent implements OnInit {
  saleTerms: ISaleTerms[] = [];
  purchase: number | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(CurrentProdState.productSaleTerms)
      .subscribe((saleTerms) => {
        if (saleTerms) {
          this.saleTerms = JSON.parse(JSON.stringify(saleTerms));
          let found = saleTerms.find(
            (quantity: ISaleTerms) => quantity.id === 'PURCHASE_MAX_QUANTITY'
          );

          if (found) this.purchase = found.value_name;
        }
      });
  }

  changePurchase() {
    let newData: ISaleTerms[] = this.saleTerms;
    console.log('this.purchase', this.purchase);
    if (this.purchase) {
      const purchase = this.purchase.toString();
      newData = this.saleTerms.map((element) =>
        element.id === 'PURCHASE_MAX_QUANTITY'
          ? { ...element, value_name: purchase }
          : element
      );

      let index = newData.findIndex(
        (sale) => sale.id === 'PURCHASE_MAX_QUANTITY'
      );
      if (index === -1)
        newData.push({
          id: 'PURCHASE_MAX_QUANTITY',
          value_name: purchase,
        });
    } else {
      // let index = this.saleTerms.findIndex(
      //   (quantity) => quantity.id === 'PURCHASE_MAX_QUANTITY'
      // );
      // if (index !== -1) {
      // newData.splice(index, 1);
      newData = this.saleTerms.map((element) =>
        element.id === 'PURCHASE_MAX_QUANTITY'
          ? { ...element, value_name: '' }
          : element
      );

      //      }
    }
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'sale_terms',
        value: newData,
      })
    );
  }
}
