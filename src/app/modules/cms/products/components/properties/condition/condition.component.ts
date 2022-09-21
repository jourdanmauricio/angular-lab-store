import { Component, OnInit } from '@angular/core';
import { PRODUCT_CONDITION } from '@core/data/constants';
import { ProdCondition } from '@core/data/enums';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss'],
})
export class ConditionComponent implements OnInit {
  availableConditions = PRODUCT_CONDITION;
  condition: ProdCondition = ProdCondition.NEW;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod) {
        this.condition = prod.condition;
      }
    });
  }

  changeCondition() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'condition',
        value: this.condition,
      })
    );
  }
}
