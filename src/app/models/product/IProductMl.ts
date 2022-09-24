import { IVariation } from './IVartiation';

export interface IProductMl {
  id: string;
  status: string;
  prod_id?: number;
  seller_custom_field?: string;
  available_quantity: number;
  // price: number;
  price: any;
  start_time: Date;
  permalink: string;
  variations: IVariation[];
}

export interface IProdMlUpdDto extends Partial<IProductMl> {}
export interface IProdMlCreateDto extends Omit<IProdMlUpdDto, 'id'> {}

export interface IProductMlState extends Partial<IProductMl> {}
