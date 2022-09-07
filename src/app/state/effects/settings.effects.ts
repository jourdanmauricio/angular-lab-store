import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, switchMap, startWith, tap } from 'rxjs/operators';
import { SettingsService } from 'src/app/services/settings.service';
import { Store } from '@ngrx/store';
import { loading } from '../actions/application.actions';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private store: Store
  ) {}

  loadSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Login Page] Set token'),
      switchMap(() =>
        this.settingsService.getSettings().pipe(
          map((settings) => {
            return {
              type: '[Settings] Loaded Settings',
              settings,
            };
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[Login Page] Logout'),
        map((settings) => ({
          type: '[Settings] Logout',
          settings,
        }))
      ),
    { dispatch: false }
  );

  setSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Settings] Update Settings'),
      switchMap((action: any) =>
        this.settingsService
          .updateSettings(action.user_id, action.settings)
          .pipe(
            tap(() => this.store.dispatch(loading({ status: false }))),
            map((settings) => ({
              type: '[Settings] Loaded Settings',
              settings,
            })),
            catchSwitchMapError(() => {
              this.store.dispatch(loading({ status: false }));
              return {
                type: '[Application] Show Error',
                message: 'Usuario o contraseña inválido',
              };
            })
          )
      )
    )
  );
}

export const catchSwitchMapError =
  (errorAction: (error: any) => any) =>
  <T>(source: Observable<T>) =>
    source.pipe(
      catchError((error, innerSource) =>
        innerSource.pipe(startWith(errorAction(error)))
      )
    );
