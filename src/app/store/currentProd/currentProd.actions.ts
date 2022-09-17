export class CurrentProdRequest {
  static readonly type = '[CurrentProd] CurrentProd Request';
  constructor(public payload: { action: string; prod: string }) {}
}

export class CurrentProdUpdate {
  static readonly type = '[CurrentProd] CurrentProd Update';
  constructor(public payload: { property: string; value: any }) {}
}

export class CurrentProdReset {
  static readonly type = '[CurrentProd] CurrentProd Reset';
}
