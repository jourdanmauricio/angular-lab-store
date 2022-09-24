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
  price: any;
  prodMl?: IProductMl;
  attributes: IAttribute[];
  available_quantity: number;
  category?: ICategory;
  category_id: string;
  condition: ProdCondition;
  description: string;
  listing_type_id: ProdListingType;
  permalink: string;
  pictures: IPicture[];
  prodWeb?: IProductWeb;
  sale_terms: ISaleTerms[];
  sold_quantity: number;
  seller_custom_field: string;
  start_time: Date;
  status: ProdStatus;
  thumbnail: string;
  title: string;
  variations: IVariation[];
  video_id?: string;
}

export interface IProdUpdDto extends Partial<IProduct> {}

/* #################### LOCAL ####################### */
export interface IProductDto extends Omit<IProduct, 'id' | 'attributes'> {
  id: number;
  attributes: IAttributeWork[];
}

export interface IProdCreateDto extends Omit<IProdUpdDto, 'id' | 'permalink'> {}
