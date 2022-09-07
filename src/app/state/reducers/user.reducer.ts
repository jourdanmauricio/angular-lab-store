import { createReducer, on } from '@ngrx/store';
import { UserState } from 'src/app/models/state/User.state';
import { logout } from '../actions/user.actions'; // loginSuccess
import { setToken, setUser } from '../actions/user.actions';

export const initialState = {} as UserState;

export const UserReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => {
    return { ...state, ...user };
  }),
  on(setToken, (state, { token }) => {
    return { ...state, ...token };
  }),
  on(logout, () => initialState)
);
