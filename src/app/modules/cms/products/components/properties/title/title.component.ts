import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  maxTitle: number = 60;

  title = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.maxTitle),
  ]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod.title) this.title.setValue(prod.title);
      if (prod.category)
        this.maxTitle = prod.category.settings.max_title_length;
    });
  }

  change() {
    this.store.dispatch(
      new CurrentProdUpdate({ property: 'title', value: this.title.value })
    );
  }
}
