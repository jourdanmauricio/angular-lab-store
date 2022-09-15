import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import {
  AuthStateModel,
  LoginRequestAttempt,
  LoginRequestSuccess,
  Logout,
  UserRequest,
} from './auth.actions';
import { AuthService } from 'app/services/auth.service';
import { Injectable } from '@angular/core';
import { SetLoading } from '../application/application.actions';
import { MessageService } from 'app/services/message.service';
import { LocalStorageService } from 'app/services/local-storage.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UsersService } from 'app/services/users.service';
import { SettingsRequest, SettingsReset } from '../settings/settings.actions';
import { Router } from '@angular/router';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    id: null,
    email: null,
    role: null,
  },
})
@Injectable()
export class AuthState {
  constructor(
    private store: Store,
    private authService: AuthService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private userService: UsersService,
    private router: Router
  ) {}

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.id !== null;
  }

  @Selector()
  static role(state: AuthStateModel): string | null | undefined {
    return state.role;
  }

  @Action(LoginRequestAttempt)
  async loginRequestAttempt(
    ctx: StateContext<AuthStateModel>,
    action: LoginRequestAttempt
  ) {
    this.store.dispatch(new SetLoading(true));
    return this.authService
      .login(action.payload.email, action.payload.password)
      .pipe(
        tap(() => this.messageService.showMsg('Bievenido!!!', 'success')),
        mergeMap((token) =>
          ctx.dispatch(new LoginRequestSuccess(token.access_token))
        ),
        catchError((err) => {
          this.store.dispatch(new SetLoading(false));
          this.messageService.showMsg(
            'Usuario o contraseña inválidos',
            'error'
          );
          return of(err);
        })
      );
  }

  @Action(LoginRequestSuccess)
  UsersRequestSuccess(
    ctx: StateContext<AuthStateModel>,
    action: LoginRequestSuccess
  ) {
    this.localStorageService.saveItem('token', action.token);
    const state = ctx.getState();
    ctx.setState({
      ...state,
      token: action.token,
    });
    return ctx.dispatch(new UserRequest());
  }

  @Action(UserRequest)
  userRequest(ctx: StateContext<AuthStateModel>, action: UserRequest) {
    this.store.dispatch(new SetLoading(true));
    return this.userService.getProfile().pipe(
      tap((user) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          id: user.id,
          email: user.email,
          role: user.role,
        });
      }),
      tap(() => this.store.dispatch(new SettingsRequest())),
      catchError((err) => {
        this.store.dispatch(new SetLoading(false));
        this.messageService.showMsg(
          'Error obteniendo datos del usuario',
          'error'
        );
        return of(err);
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('tokenMl');
    this.localStorageService.removeItem('refreshTokenMl');
    ctx.setState({
      ...state,
      token: null,
      id: null,
      email: null,
      role: null,
    });
    ctx.dispatch(new SettingsReset());
    this.router.navigate(['/home']);
  }
}
