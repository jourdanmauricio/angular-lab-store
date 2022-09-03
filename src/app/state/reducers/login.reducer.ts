import { createReducer, on } from '@ngrx/store';
import { LoginState } from 'src/app/models/state/Login.state';
import { loginSuccess, loginUser } from '../actions/login.actions';

export const initialState: LoginState = {
  loading: false,
  access_token: '',
};
export const LoginReducer = createReducer(
  initialState,
  on(loginUser, (state) => {
    return { ...state, loading: true };
  }),
  on(loginSuccess, (state, { token }) => {
    return {
      ...state,
      loading: false,
      access_token: token.access_token,
    };
  })
);
