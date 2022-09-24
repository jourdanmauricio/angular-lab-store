import { IVariation } from './IVartiation';

export interface IProductWeb {
  id: string;
  status: string;
  prod_id?: number;
  seller_custom_field?: string;
  available_quantity: number;
  price: any;
  start_time: Date;
  permalink: string;
  variations: IVariation[];
}

export interface IProdWebUpdDto extends Partial<IProductWeb> {}
export interface IProductWebState extends Partial<IProductWeb> {}
