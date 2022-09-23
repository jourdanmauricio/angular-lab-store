import { ValueAtrib } from '@models/category/IValueAtrib';
import { IAttribute } from './IAttribute';

export interface IVariation {
  id: number | string;
  attributes: IAttribute[];
  available_quantity: number;
  attribute_combinations: IAttributeCombination[];
  catalog_product_id?: null;
  inventory_id?: null;
  item_relations?: any[];
  picture_ids: string[];
  price: number;
  sale_terms?: any[];
  seller_custom_field?: null;
  sold_quantity?: number;
  updated?: boolean;
}

export interface IAttributeCombination {
  value_name: string;
  value_struct?: null;
  values?: ValueAtrib[];
  id: string;
  name: string;
  value_id?: null | string;
}

export interface IVariationUpdDto extends Partial<IVariation> {}
