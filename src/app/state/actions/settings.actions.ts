import { createAction, props } from '@ngrx/store';
import { Settings } from '@models/setting.model';

export const loadSettings = createAction('[Settings] Load Settings');

export const loadedSettings = createAction(
  '[Settings] Loaded Settings',
  props<{ settings: Settings }>()
);

export const updateSettings = createAction(
  '[Settings] Update Settings',
  props<{ user_id: number; settings: Settings }>()
);

export const logout = createAction('[Settings] Logout');
