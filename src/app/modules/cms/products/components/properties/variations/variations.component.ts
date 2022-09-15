import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Variation } from '@models/index';
// import { getCurrentProd } from 'app/state/selectors/currentProd.selector';

@Component({
  selector: 'app-variations',
  templateUrl: './variations.component.html',
  styleUrls: ['./variations.component.scss'],
})
export class VariationsComponent implements OnInit {
  variations: Variation[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.store
    //   .select(getCurrentProd)
    //   .subscribe((data) => (this.variations = data.variations));
    // console.log('Variations', this.variations);
  }
}
