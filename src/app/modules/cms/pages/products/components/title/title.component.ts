import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateCurrentProd } from 'src/app/state/actions/currentProd.actions';
import { getCurrentProd } from 'src/app/state/selectors/currentProd.selector';

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

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select(getCurrentProd).subscribe((data) => {
      if (data.category) {
        this.title.setValue(data.title);
        this.maxTitle = data.category!.settings.max_title_length;
      }
    });
  }

  change() {
    this.store.dispatch(
      updateCurrentProd({
        property: { title: this.title.value },
      })
    );
  }
}
