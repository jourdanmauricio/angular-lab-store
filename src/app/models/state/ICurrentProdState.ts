import { IprodState } from '..';

export interface ICurrentProdState {
  prod: IprodState | null;
  updated: string[];
  action: string;
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
