import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { setAction, setUpdatedField } from '../actions/application.actions';

@Injectable()
export class ApplicationEffects {
  constructor(private actions$: Actions, private store: Store) {}

  setAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[Product Edit] Loaded currentProd'),
        map(() => this.store.dispatch(setAction({ action: 'edit' })))
      ),
    { dispatch: false }
  );

  setUpdatedField$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[Product Edit] Update currentProd'),
        map((updated: any) => {
          let prop = Object.keys(updated.property)[0];
          this.store.dispatch(setUpdatedField({ field: prop }));
        })
      ),
    { dispatch: false }
  );
}
