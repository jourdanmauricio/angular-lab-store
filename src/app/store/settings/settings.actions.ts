import {
  CONDITION,
  PROD_LISTING_TYPE,
  PROD_STATUS,
} from '@core/constants/enums';
import { Picture } from '@models/picture.model';

export interface SettingsStateModel {
  status: PROD_STATUS | null;
  hintSku: boolean | null;
  pictures: Picture[] | null;
  condition: CONDITION | null;
  listing_type_id: PROD_LISTING_TYPE | null;
  price_percent_ml: number | null;
  price_percent_web: number | null;
}

export class SettingsRequest {
  static readonly type = '[Settings] Settings Request';
}

export class SettingsUpdate {
  static readonly type = '[Settings] Settings Update';
  constructor(
    public payload: { userId: number; settings: SettingsStateModel }
  ) {}
}

export class SettingsReset {
  static readonly type = '[Settings] Settings Reset';
}
