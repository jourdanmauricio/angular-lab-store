import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateCurrentProd } from 'app/state/actions/currentProd.actions';
import { getCurrentProd } from 'app/state/selectors/currentProd.selector';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.scss'],
})
export class SkuComponent implements OnInit {
  sku = new FormControl('', [Validators.required]);

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select(getCurrentProd).subscribe((data) => {
      if (data.category) {
        this.sku.setValue(data.seller_custom_field);
      }
    });
  }

  change() {
    this.store.dispatch(
      updateCurrentProd({
        property: { seller_custom_field: this.sku.value },
      })
    );
  }
}
