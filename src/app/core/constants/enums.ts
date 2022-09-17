export enum ROLES {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  SUPERADMIN = 'superadmin',
}

export enum CONDITION {
  NEW = 'new',
  USED = 'used',
}

export enum PROD_STATUS {
  ACTIVE = 'active',
  PAUSED = 'paused',
  UNDER_REVIEW = 'under_review',
  INACTIVE = 'inactive',
  CLOSED = 'closed',
}

export enum PROD_LISTING_TYPE {
  GOLD_PRO = 'gold_pro',
  GOLD_SPECIAL = 'gold_special',
}

export enum DOCUMENT_TYPES {
  DNI = 'DNI',
  LE = 'LE',
  CUIT = 'CUIT',
  CUIL = 'CUIL',
  LC = 'LC',
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
