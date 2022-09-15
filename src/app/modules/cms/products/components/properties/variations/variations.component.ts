import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Variation } from '@models/index';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-variations',
  templateUrl: './variations.component.html',
  styleUrls: ['./variations.component.scss'],
})
export class VariationsComponent implements OnInit {
  variations: Variation[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod.variations) this.variations = prod.variations;
    });
  }
}
