import { Component, Input, OnInit } from '@angular/core';
import { PROD_STATUS } from '@core/constants/enums';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  status: string = 'active';

  availableStatus = [
    PROD_STATUS.ACTIVE,
    PROD_STATUS.PAUSED,
    PROD_STATUS.CLOSED,
    PROD_STATUS.INACTIVE,
    PROD_STATUS.UNDER_REVIEW,
  ];

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
