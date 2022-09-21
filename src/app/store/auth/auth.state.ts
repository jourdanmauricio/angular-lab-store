import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { IAuthState } from '@models/index';
import {
  LoginRequestAttempt,
  LoginRequestSuccess,
  Logout,
  UserMlRequest,
  UserRequest,
} from './auth.actions';
import { AuthService } from 'app/services/auth.service';
import { Injectable } from '@angular/core';
import { SetLoading } from '../application/application.actions';
import { MessageService } from 'app/services/message.service';
import { LocalStorageService } from 'app/services/local-storage.service';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { UsersService } from 'app/services/users.service';
import { SettingsRequest, SettingsReset } from '../settings/settings.actions';
import { Router } from '@angular/router';
import { Roles } from '@core/data/enums';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@State<IAuthState>({
  name: 'auth',
  defaults: {
    token: null,
    id: null,
    email: null,
    role: null,
    ml_id: null,
    nickname: null,
    access_token: null,
    refresh_token: null,
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
  static isAuthenticated(state: IAuthState): boolean {
    return state.id !== null;
  }

  @Selector()
  static role(state: IAuthState): Roles | null {
    return state.role;
  }

  @Selector()
  static id(state: IAuthState): number | null {
    return state.id;
  }

  @Action(LoginRequestAttempt)
  async loginRequestAttempt(
    ctx: StateContext<IAuthState>,
    action: LoginRequestAttempt
  ) {
    this.store.dispatch(new SetLoading(true));
    return this.authService
      .login(action.payload.email, action.payload.password)
      .pipe(
        tap(() => this.messageService.showMsg('Bienvenido!!!', 'success')),
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
    ctx: StateContext<IAuthState>,
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
  userRequest(ctx: StateContext<IAuthState>, action: UserRequest) {
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
      tap(() => ctx.dispatch(new UserMlRequest())),
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

  @Action(UserMlRequest)
  userMlRequest(ctx: StateContext<IAuthState>) {
    this.store.dispatch(new SetLoading(true));
    return this.userService.getApiUserMl().pipe(
      tap((userMl) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          ml_id: userMl.id,
          nickname: userMl.nickname,
          access_token: userMl.access_token,
          refresh_token: userMl.refresh_token,
        });
      }),
      tap(() => this.store.dispatch(new SettingsRequest())),
      catchError((err: HttpErrorResponse) => {
        this.store.dispatch(new SetLoading(false));
        if (err.status !== HttpStatusCode.NotFound) {
          this.messageService.showMsg(
            'Error obteniendo datos del usuario',
            'error'
          );
        }
        return of(err);
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<IAuthState>) {
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
      ml_id: null,
      nickname: null,
      access_token: null,
      refresh_token: null,
    });
    ctx.dispatch(new SettingsReset());
    this.router.navigate(['/home']);
  }
}
