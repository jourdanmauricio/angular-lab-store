export enum Roles {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  SUPERADMIN = 'superadmin',
}

export enum ProdCondition {
  NEW = 'new',
  USED = 'used',
}

export enum ProdStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  UNDER_REVIEW = 'under_review',
  INACTIVE = 'inactive',
  CLOSED = 'closed',
}

export enum ProdListingType {
  GOLD_PRO = 'gold_pro',
  GOLD_SPECIAL = 'gold_special',
}

export enum DocumentTypes {
  DNI = 'DNI',
  LE = 'LE',
  CUIT = 'CUIT',
  CUIL = 'CUIL',
  LC = 'LC',
}

export enum WarrantyType {
  GARANTIA_VENDEDOR = 'Garantía del vendedor',
  GARANTIA_FABRICA = 'Garantía de fábrica',
  SIN_GARANTIA = 'Sin garantía',
}

export enum WarrantyUnit {
  DIAS = 'días',
  MESES = 'meses',
  ANIOS = 'años',
}

export enum AttributeGroupID {
  Main = 'MAIN',
  Others = 'OTHERS',
}

export enum AttributeGroupName {
  Otros = 'Otros',
  Principales = 'Principales',
}

export enum ValueType {
  Boolean = 'boolean',
  List = 'list',
  Number = 'number',
  NumberUnit = 'number_unit',
  PictureID = 'picture_id',
  String = 'string',
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
