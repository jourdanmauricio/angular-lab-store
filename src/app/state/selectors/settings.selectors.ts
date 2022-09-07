import { createSelector } from '@ngrx/store';
import { SettingsState } from 'src/app/models/state/SettingsState.state';
import { AppState } from '../app.state';

export const globalSettings = (state: AppState) => state.setttings;

export const getSettings = createSelector(
  globalSettings,
  (state: SettingsState) => state.settings
);
