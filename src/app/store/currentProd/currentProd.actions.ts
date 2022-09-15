export interface CurrentProdStateModel {
  prod: ICurrentProd | null;
  updated: string[];
  action: string;
}

export class CurrentProdRequest {
  static readonly type = '[CurrentProd] CurrentProd Request';
  constructor(public payload: { action: string; prod: string }) {}
}

export class CurrentProdUpdate {
  static readonly type = '[CurrentProd] CurrentProd Update';
  constructor(public payload: { property: string; value: any }) {}
}

export class CurrentProdReset {
  static readonly type = '[CurrentProd] CurrentProd Reset';
}

export interface ICurrentProd {
  id?: string;
  title?: string;
  listing_type_id?: string;
  sale_terms?: any[];
  permalink?: string;
  thumbnail?: string;
  attributes?: Attribute[];
  variations?: Variation[];
  status?: string;
  available_quantity?: number;
  start_time?: Date;
  pictures?: ProdPicture[];
  category_id?: string;
  price?: number;
  sold_quantity?: number;
  condition?: string;
  seller_custom_field?: string;
  description?: string;
  updated?: string[];
  category?: Category;
}

export interface Attribute {
  name?: string;
  value_id?: null | string;
  value_name?: null | string;
  value_struct?: null;
  values?: Value[];
  attribute_group_id?: any;
  attribute_group_name?: any;
  id: string;
}

export interface Value {
  id: string;
  name: string;
  struct: null;
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

export interface ProdPicture {
  secure_url: string;
  size: string;
  max_size: string;
  quality: string;
  id: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  full_name: string;
  path_from_root: ApiBasicCategory[];
  children_categories?: ApiBasicCategory[];
  picture: string | null;
  settings: CatSettings;
  attributes: CategoryAttribute[];
  attributes_oblg: AttributesOblg;
  description_web: string | null;
}

export interface ApiBasicCategory {
  id: string;
  name: string;
  total_items_in_this_category?: number;
}

export interface CategoryAttribute {
  id: string;
  hint?: string;
  name: string;
  tags?: Tags;
  values?: ValueAtrib[];
  hierarchy?: any;
  relevance?: number;
  value_type?: ValueType;
  value_max_length?: number;
  attribute_group_id?: string;
  attribute_group_name?: string;
  default_unit?: string;
  allowed_units?: ApiBasicCategory[];
  type?: string;
  tooltip?: string;
}

export interface Tags {
  catalog_required?: boolean;
  validate?: boolean;
  multivalued?: boolean;
  used_hidden?: boolean;
  variation_attribute?: boolean;
  hidden?: boolean;
  read_only?: boolean;
  custom?: boolean;
}

export interface ValueAtrib {
  id: string;
  name: string;
  metadata?: any;
}

export interface ComponentAttribute {
  id: string;
  name: string;
  tags: Tag[];
  values?: ValueAtrib[];
  hierarchy: any;
  relevance: number;
  value_type: ValueType;
  value_max_length?: number;
  units?: ApiBasicCategory[];
  default_unit_id?: string;
}

export interface AttributesOblg {
  groups: Group[];
}

export interface Group {
  id: string;
  label: string;
  relevance: number;
  ui_config: any;
  components: any;
}

export interface CatSettings {
  tags: any[];
  price: string;
  stock: string;
  status: string;
  fragile: boolean;
  vertical: string;
  currencies: string[];
  buying_modes: string[];
  restrictions: any[];
  sub_vertical: string;
  subscribable: boolean;
  adult_content: boolean;
  maximum_price: null;
  minimum_price: number;
  vip_subdomain: string;
  buying_allowed: boolean;
  catalog_domain: string;
  coverage_areas: string;
  seller_contact: string;
  item_conditions: string[];
  listing_allowed: boolean;
  mirror_category: null;
  rounded_address: boolean;
  simple_shipping: string;
  max_title_length: number;
  shipping_options: string[];
  shipping_profile: string;
  immediate_payment: string;
  reservation_allowed: string;
  max_sub_title_length: number;
  items_reviews_allowed: boolean;
  max_pictures_per_item: number;
  max_description_length: number;
  max_variations_allowed: number;
  maximum_price_currency: string;
  minimum_price_currency: string;
  mirror_master_category: null;
  mirror_slave_categories: any[];
  show_contact_information: boolean;
  buyer_protection_programs: string[];
  max_pictures_per_item_var: number;
}

export enum Tag {
  CatalogRequired = 'catalog_required',
  Hidden = 'hidden',
  Multivalued = 'multivalued',
  ReadOnly = 'read_only',
  UsedHidden = 'used_hidden',
  Validate = 'validate',
  VariationAttribute = 'variation_attribute',
  VipHidden = 'vip_hidden',
}

export enum ComponentEnum {
  BooleanInput = 'BOOLEAN_INPUT',
  Combo = 'COMBO',
  NumberInput = 'NUMBER_INPUT',
  NumberUnitInput = 'NUMBER_UNIT_INPUT',
  PictureInput = 'PICTURE_INPUT',
  TextInput = 'TEXT_INPUT',
}

export enum ValueType {
  Boolean = 'boolean',
  List = 'list',
  Number = 'number',
  NumberUnit = 'number_unit',
  PictureID = 'picture_id',
  String = 'string',
}
