import { ISettingsState } from '@models/index';

export class SettingsRequest {
  static readonly type = '[Settings] Settings Request';
}

export class SettingsUpdate {
  static readonly type = '[Settings] Settings Update';
  constructor(public payload: { userId: number; settings: ISettingsState }) {}
}

export class SettingsReset {
  static readonly type = '[Settings] Settings Reset';
}
