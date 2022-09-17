import {
  CONDITION,
  PROD_LISTING_TYPE,
  PROD_STATUS,
} from '@core/constants/enums';
import { ICategory } from './category/ICategory';
import { IAttribute } from './product/IAttribute';
import { IPicture } from './product/IPicture';
import { IVariation } from './product/IVartiation';

/* ###################### ML ####################### */
export interface IProduct {
  id: string;
  attributes: IAttribute[];
  title: string;
  listing_type_id: PROD_LISTING_TYPE;
  sale_terms: any[];
  permalink: string;
  thumbnail: string;
  variations: IVariation[];
  status: PROD_STATUS;
  available_quantity: number;
  start_time: Date;
  prodMl?: any;
  prodWeb?: any;
  pictures: IPicture[];
  category_id: string;
  price: number;
  sold_quantity: number;
  condition: CONDITION;
  seller_custom_field: string;
  description: string;
  category?: ICategory;
}

export interface IprodState extends Partial<IProduct> {}

/* #################### LOCAL ####################### */
export interface Product extends Omit<IProduct, 'id'> {
  id: number;
  // category?: Category;
}

export interface CreateProductDto extends Omit<Product, 'id' | 'permalink'> {
  // ml_id: string;
}
