import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/_animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading } from 'src/app/state/selectors/application.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})
export class LayoutComponent implements OnInit {
  loading$: Observable<boolean> = new Observable();

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
  }
}
