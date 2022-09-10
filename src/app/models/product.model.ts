import { Category } from './category.model';

/* ###################### ML ####################### */
export interface ApiProduct {
  id: string;
  title: string;
  listing_type_id: string;
  sale_terms: any[];
  permalink: string;
  thumbnail: string;
  attributes: Attribute[];
  variations: Variation[];
  status: string;
  available_quantity: number;
  start_time: Date;
  pictures: Picture[];
  category_id: string;
  price: number;
  sold_quantity: number;
  condition: string;
  seller_custom_field: string;
  description: string;
  updated?: string[];
}

/* #################### LOCAL ####################### */
export interface Product extends Omit<ApiProduct, 'id'> {
  id: number;
  category?: Category;
}

export interface CreateProductDto extends Omit<Product, 'id'> {
  // ml_id: string;
}

/* #################### AMBOS ####################### */
export interface Attribute {
  name?: string;
  value_id?: null | string;
  value_name?: null | string;
  value_struct?: null;
  values?: Value[];
  attribute_group_id?: AttributeGroupID;
  attribute_group_name?: AttributeGroupName;
  id: string;
}

export enum AttributeGroupID {
  Main = 'MAIN',
  Others = 'OTHERS',
}

export enum AttributeGroupName {
  Otros = 'Otros',
  Principales = 'Principales',
}

export interface Value {
  id: string;
  name: string;
  struct: null;
}

export interface Picture {
  secure_url: string;
  size: string;
  max_size: string;
  quality: string;
  id: string;
  url: string;
}

export interface Variation {
  id: number | string;
  attributes?: Attribute[];
  available_quantity: number;
  attribute_combinations: AttributeCombination[];
  catalog_product_id?: null;
  inventory_id?: null;
  item_relations?: any[];
  picture_ids: string[];
  price: number;
  sale_terms?: any[];
  seller_custom_field?: null;
  sold_quantity?: number;
}

export interface AttributeCombination {
  value_name: string;
  value_struct?: null;
  values?: Value[];
  id: string;
  name: string;
  value_id?: null | string;
}
