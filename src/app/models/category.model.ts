export interface Category {
  id: string;
  name: string;
  full_name: string;
  path_from_root: PathFromRoot[];
  children_categories?: [];
  picture: null;
  settings: Settings;
  attributes: CategoryAttribute[];
  attributes_oblg: AttributesOblg;
  description_web: null;
}

export interface CategoryAttribute {
  id: string;
  hint?: string;
  name: string;
  tags: Tags;
  values?: Value[];
  hierarchy: Hierarchy;
  relevance: number;
  value_type: ValueType;
  value_max_length?: number;
  attribute_group_id: AttributeGroupID;
  attribute_group_name: AttributeGroupName;
  default_unit?: string;
  allowed_units?: PathFromRoot[];
  type?: string;
  tooltip?: string;
}

export interface PathFromRoot {
  id: string;
  name: string;
}

export enum AttributeGroupID {
  Others = 'OTHERS',
}

export enum AttributeGroupName {
  Otros = 'Otros',
}

export enum Hierarchy {
  ChildPk = 'CHILD_PK',
  Family = 'FAMILY',
  Item = 'ITEM',
  ParentPk = 'PARENT_PK',
  ProductIdentifier = 'PRODUCT_IDENTIFIER',
}

export interface Tags {
  catalog_required?: boolean;
  validate?: boolean;
  multivalued?: boolean;
  used_hidden?: boolean;
  variation_attribute?: boolean;
  hidden?: boolean;
  read_only?: boolean;
}

export enum ValueType {
  Boolean = 'boolean',
  List = 'list',
  Number = 'number',
  NumberUnit = 'number_unit',
  PictureID = 'picture_id',
  String = 'string',
}

export interface Value {
  id: string;
  name: string;
  metadata?: Metadata;
}

export interface Metadata {
  value: boolean;
}

export interface AttributesOblg {
  groups: Group[];
}

export interface Group {
  id: string;
  label: string;
  relevance: number;
  ui_config: GroupUIConfig;
  components: ComponentElement[];
}

export interface ComponentElement {
  label: string;
  component: ComponentEnum;
  ui_config: ComponentUIConfig;
  attributes: ComponentAttribute[];
  unified_units: PathFromRoot[];
  default_unified_unit_id?: string;
}

export interface ComponentAttribute {
  id: string;
  name: string;
  tags: Tag[];
  values?: Value[];
  hierarchy: Hierarchy;
  relevance: number;
  value_type: ValueType;
  value_max_length?: number;
  units?: PathFromRoot[];
  default_unit_id?: string;
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

export interface ComponentUIConfig {
  hint?: string;
  allow_filtering: boolean;
  allow_custom_value: boolean;
  tooltip?: string;
}

export interface GroupUIConfig {}

export interface Settings {
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
