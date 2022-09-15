// TODO: CONSTANTE PARA CONDITION, STATUS, LISITNG
export interface SettingsStateModel {
  status: string | null;
  hintSku: boolean | null;
  pictures: string[] | null;
  condition: string | null;
  listing_type_id: string | null;
  price_percent_ml: number | null;
  price_percent_web: number | null;
}

export class SettingsRequest {
  static readonly type = '[Settings] Settings Request';
}

export class SettingsReset {
  static readonly type = '[Settings] Settings Reset';
}
