import { ProdCondition, ProdListingType, ProdStatus } from '@core/data/enums';
import { ICategory } from './category/ICategory';
import { IAttribute, IAttributeWork } from './product/IAttribute';
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
  video_id?: string;
  category?: ICategory;
}

export interface IProdUpdDto extends Partial<IProduct> {}

/* #################### LOCAL ####################### */
export interface IProductDto extends Omit<IProduct, 'id' | 'attributes'> {
  id: number;
  attributes: IAttributeWork[];
  // category?: Category;
}

export interface IProdCreateDto extends Omit<IProdUpdDto, 'id' | 'permalink'> {
  // ml_id: string;
}
