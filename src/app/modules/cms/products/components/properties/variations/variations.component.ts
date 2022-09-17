import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IVariation } from '@models/index';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-variations',
  templateUrl: './variations.component.html',
  styleUrls: ['./variations.component.scss'],
})
export class VariationsComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
