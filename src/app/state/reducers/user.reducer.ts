import { createReducer, on } from '@ngrx/store';
import { UserState } from 'src/app/models/state/User.state';
import { loginSuccess, loginUser } from '../actions/login.actions';
import { getUser } from '../actions/user.actions';

export const initialState: UserState = {
  loading: false,
  user: {
    id: 0,
    email: '',
    password: '',
    recovery_token: '',
    role: '',
    token: '',
  },
};
export const UserReducer = createReducer(
  initialState,
  on(getUser, (state, { user }) => {
    return { ...state, loading: false, user: user };
  })
);
