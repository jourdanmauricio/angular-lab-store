import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ApplicationState } from 'src/app/models/state/Application.state';

export const selectApplication = (state: AppState) => state.application;

export const selectLoading = createSelector(
  selectApplication,
  (state: ApplicationState) => state.loading
);

export const getErrorMessage = createSelector(
  selectApplication,
  (state: ApplicationState) => state.errorMessage
);
