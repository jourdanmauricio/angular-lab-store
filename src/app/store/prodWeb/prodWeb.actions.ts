import { IProductWeb, IProductWebState, IProdWebState } from '@models/index';

export class ProdWebRequest {
  static readonly type = '[Prod WEB] Product Request';
  constructor(
    public payload: { action: string; prod: IProductWebState | null }
  ) {}
}

export class ProdWebUpdate {
  static readonly type = '[Prod WEB] Product Update';
  constructor(public payload: { property: string; value: any }) {}
}

export class ProdWebReset {
  static readonly type = '[Prod WEB] Product Reset';
}
