import { createSelector } from '@ngrx/store';
import { UserState } from 'src/app/models/state/User.state';
import { AppState } from '../app.state';

export const getUser = (state: AppState) => state.user;

export const isAuthenticated = createSelector(getUser, (state: UserState) =>
  state.id ? true : false
);
