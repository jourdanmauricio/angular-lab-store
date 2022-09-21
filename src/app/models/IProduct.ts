import {
  ProdCondition,
  ProdListingType,
  ProdStatus,
} from '@core/constants/enums';
import { ICategory } from './category/ICategory';
import { IAttribute } from './product/IAttribute';
import { IPicture } from './product/IPicture';
import { IProductMl } from './product/IProductMl';
import { IProductWeb } from './product/IProductWeb';
import { ISaleTerms } from './product/ISaleTerms';
import { IVariation } from './product/IVartiation';

/* ###################### ML ####################### */
export interface IProduct {
  id: string;
  attributes: IAttribute[];
  title: string;
  listing_type_id: ProdListingType;
  sale_terms: ISaleTerms[];
  permalink: string;
  thumbnail: string;
  variations: IVariation[];
  status: ProdStatus;
  available_quantity: number;
  start_time: Date;
  prodMl?: IProductMl;
  prodWeb?: IProductWeb;
  pictures: IPicture[];
  category_id: string;
  price: number;
  sold_quantity: number;
  condition: ProdCondition;
  seller_custom_field: string;
  description: string;
  video?: string;
  category?: ICategory;
}

export interface IprodState extends Partial<IProduct> {}

/* #################### LOCAL ####################### */
export interface IProductDto extends Omit<IProduct, 'id'> {
  id: number;
  // category?: Category;
}

export interface CreateProductDto
  extends Omit<IProductDto, 'id' | 'permalink'> {
  // ml_id: string;
}
