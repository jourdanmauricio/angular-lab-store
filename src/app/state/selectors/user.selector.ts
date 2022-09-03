import { createSelector } from '@ngrx/store';
import { UserState } from 'src/app/models/state/User.state';
import { AppState } from '../app.state';

export const selectGlobal = (state: AppState) => state.user;

export const selectUser = createSelector(
  selectGlobal,
  (state: UserState) => state.user
);

export const selectLoading = createSelector(
  selectGlobal,
  (state: UserState) => state.loading
);
