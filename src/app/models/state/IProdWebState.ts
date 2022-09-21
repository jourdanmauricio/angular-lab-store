import { IProductWeb, IProductWebState } from '@models/product/IProductWeb';

export interface IProdWebState {
  prodWeb: IProductWebState | null;
  updated: string[];
  action: string;
}
