import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Login Page] Login success'),
      switchMap(() => this.usersService.getProfile()),
      map((user) => {
        console.log('user!!!!!', user);
        return {
          type: '[Login Page] Get User',
          user,
        };
      }),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private usersService: UsersService
  ) {}
}
