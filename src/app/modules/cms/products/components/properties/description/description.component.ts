import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  description!: string;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod) {
        this.description = prod.description;
      }
    });
  }

  clearDescription() {
    this.description = ' ';
    this.changeDescription();
  }

  changeDescription() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'description',
        value: this.description,
      })
    );
  }
}
