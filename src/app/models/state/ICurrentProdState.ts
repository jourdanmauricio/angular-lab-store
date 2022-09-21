import { IprodState } from '..';

export interface ICurrentProdState {
  prod: IprodState | null;
  updated: string[];
  action: string;
}
