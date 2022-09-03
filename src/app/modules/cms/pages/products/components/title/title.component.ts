import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectCurrentProd } from 'src/app/state/selectors/currentProd.selector';

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
  currentProd$: Observable<any> = new Observable();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectCurrentProd).subscribe((data) => {
      if (data.currentProd.category) {
        this.title.setValue(data.currentProd.title);
        this.maxTitle = data.currentProd.category!.settings.max_title_length;
      }
    });
    // this.currentProd$ = this.store.select(selectCurrentProd);
  }

  change() {
    //console.log('Change ', this.title.value);
    // this.productsService.updateCurrentProduct({ title: this.title.value });
  }
}
