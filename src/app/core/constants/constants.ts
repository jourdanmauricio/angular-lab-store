import {
  ProdListingType,
  ProdCondition,
  ProdStatus,
  DocumentTypes,
  WarrantyType,
  WarrantyUnit,
} from './enums';

export const PRODUCT_STATUS = [
  ProdStatus.ACTIVE,
  ProdStatus.PAUSED,
  ProdStatus.CLOSED,
  ProdStatus.INACTIVE,
  ProdStatus.UNDER_REVIEW,
];

export const PRODUCT_CONDITION = [ProdCondition.NEW, ProdCondition.USED];

export const PRODUCT_LISTING = [
  ProdListingType.GOLD_PRO,
  ProdListingType.GOLD_SPECIAL,
];

export const DOCUMENT_TYPES = [
  DocumentTypes.CUIL,
  DocumentTypes.CUIT,
  DocumentTypes.DNI,
  DocumentTypes.LC,
  DocumentTypes.LE,
];

export const WARRANTY_TYPE = [
  { id: '2230279', name: WarrantyType.GARANTIA_FABRICA },
  { id: '2230280', name: WarrantyType.GARANTIA_VENDEDOR },
  { id: '6150835', name: WarrantyType.SIN_GARANTIA },
];

export const WARRANTY_UNIT = [
  WarrantyUnit.ANIOS,
  WarrantyUnit.MESES,
  WarrantyUnit.DIAS,
];
