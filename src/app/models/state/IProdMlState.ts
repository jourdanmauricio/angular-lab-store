import { IProductMlState } from '@models/product/IProductMl';

export interface IProdMlState {
  prodMl: IProductMlState | null;
  updated: string[];
  action: string;
}
