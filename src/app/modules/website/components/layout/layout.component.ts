import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '@core/_animations';
import { Select, Store } from '@ngxs/store';
import { ApplicationStateModel } from 'app/store/application/application.actions';
import { ApplicationState } from 'app/store/application/application.state';
import { Observable } from 'rxjs';
// import { selectLoading } from 'app/state/selectors/application.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})
export class LayoutComponent implements OnInit {
  constructor(private store: Store) {}

  @Select(ApplicationState.isLoading) isLoading$!: Observable<boolean>;

  ngOnInit(): void {}
}
