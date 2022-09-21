import { Component, OnInit } from '@angular/core';
import { PRODUCT_STATUS } from '@core/data/constants';
import { ProdStatus } from '@core/data/enums';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  availableStatus = PRODUCT_STATUS;
  status: ProdStatus = ProdStatus.ACTIVE;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod) {
        this.status = prod.status;
      }
    });
  }

  changeStatus() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'status',
        value: this.status,
      })
    );
  }
}
