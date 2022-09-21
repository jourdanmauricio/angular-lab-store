import { IProdUpdDto } from '..';

export interface ICurrentProdState {
  prod: IProdUpdDto | null;
  updated: string[];
  action: string;
}
