import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Variation } from '@models/product.model';
import { getCurrentProd } from 'app/state/selectors/currentProd.selector';

@Component({
  selector: 'app-variations',
  templateUrl: './variations.component.html',
  styleUrls: ['./variations.component.scss'],
})
export class VariationsComponent implements OnInit {
  variations: Variation[] = [];

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store
      .select(getCurrentProd)
      .subscribe((data) => (this.variations = data.variations));

    console.log('Variations', this.variations);
  }
}
