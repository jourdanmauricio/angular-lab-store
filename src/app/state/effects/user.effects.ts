// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { EMPTY, Observable, of, pipe } from 'rxjs';
// import { map, catchError, switchMap, tap, startWith } from 'rxjs/operators';
// import { UsersService } from 'app/services/users.service';
// import { Store } from '@ngrx/store';
// import { AuthService } from 'app/services/auth.service';
// import { Router } from '@angular/router';
// import { errorMessage, loading } from '../actions/application.actions';

// @Injectable()
// export class UserEffects {
//   constructor(
//     private actions$: Actions,
//     private usersService: UsersService,
//     private store: Store,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   token$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType('[Login Page] Login'),
//       switchMap((action: any) =>
//         this.authService.login(action.username, action.password)
//       ),
//       map((acc_token) => ({
//         type: '[Login Page] Set token',
//         token: acc_token,
//       })),
//       catchSwitchMapError(() => {
//         this.store.dispatch(loading({ status: false }));
//         return {
//           type: '[Application] Show Error',
//           message: 'Usuario o contraseña inválido',
//         };
//         // return of(
//         //   this.store.dispatch(
//         //     errorMessage({ message: 'Usuario o contraseña inválido' })
//         //   )
//         // );
//       })
//     )
//   );

//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType('[Login Page] Set token'),
//       switchMap(() => this.usersService.getApiUserMl()),
//       switchMap(() => this.usersService.getProfile()),
//       map((user) => ({
//         type: '[Login Page] Set User',
//         user,
//       })),
//       tap(() => this.store.dispatch(loading({ status: false }))),
//       catchError(() => EMPTY)
//     )
//   );

//   logout$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType('[Login Page] Logout'),
//         tap(() => this.authService.logout()),
//         tap(() => this.router.navigate(['/home']))
//       ),
//     { dispatch: false }
//   );
// }

// export const catchSwitchMapError =
//   (errorAction: (error: any) => any) =>
//   <T>(source: Observable<T>) =>
//     source.pipe(
//       catchError((error, innerSource) =>
//         innerSource.pipe(startWith(errorAction(error)))
//       )
//     );
