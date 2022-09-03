import { createAction, props } from '@ngrx/store';
import { LoginState } from 'src/app/models/state/Login.state';

export const loginUser = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login Page] Login success',
  props<{ token: LoginState }>()
);
