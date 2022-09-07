import { createReducer, on } from '@ngrx/store';
import { SettingsState } from 'src/app/models/state/SettingsState.state';
import { loadedSettings } from '../actions/settings.actions';
import { logout } from '../actions/user.actions';

export const initialState = {} as SettingsState;

export const SettingsReducer = createReducer(
  initialState,
  on(loadedSettings, (state, { settings }) => {
    return { ...state, settings };
  }),
  on(logout, () => initialState)
);
