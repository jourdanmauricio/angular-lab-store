import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Store } from '@ngrx/store';
import { updateCurrentProd } from 'src/app/state/actions/currentProd.actions';
import { getCurrentProd } from 'src/app/state/selectors/currentProd.selector';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.scss'],
})
export class SkuComponent implements OnInit {
  sku = new FormControl('', [
    Validators.required,
    // Validators.maxLength(this.maxTitle),
  ]);

  constructor(
    private productsService: ProductsService,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.store.select(getCurrentProd).subscribe((data) => {
      if (data.category) {
        this.sku.setValue(data.seller_custom_field);
        // this.maxTitle = data.category!.settings.max_title_length;
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
