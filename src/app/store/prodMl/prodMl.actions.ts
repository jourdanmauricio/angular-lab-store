import { IProductMl } from '@models/product/IProductMl';

export class ProdMlRequest {
  static readonly type = '[Prod ML] Product Request';
  constructor(public payload: { action: string; prod: IProductMl }) {}
}

export class ProdMlUpdate {
  static readonly type = '[Prod ML] Product Update';
  constructor(public payload: { property: string; value: any }) {}
}

export class ProdMlReset {
  static readonly type = '[Prod ML] Product Reset';
}
