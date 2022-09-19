import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit {
  quantityVar: number = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod.variations) this.quantityVar = prod.variations.length;
    });
  }
}
