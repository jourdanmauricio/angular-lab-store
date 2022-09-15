import {
  CONDITION,
  PROD_LISTING_TYPE,
  PROD_STATUS,
} from '@core/constants/enums';

export interface SettingsStateModel {
  status: PROD_STATUS | null;
  hintSku: boolean | null;
  pictures: string[] | null;
  condition: CONDITION | null;
  listing_type_id: PROD_LISTING_TYPE | null;
  price_percent_ml: number | null;
  price_percent_web: number | null;
}

export class SettingsRequest {
  static readonly type = '[Settings] Settings Request';
}

export class SettingsReset {
  static readonly type = '[Settings] Settings Reset';
}
