import { ValueType } from '@core/constants/enums';
import { ApiBasicCategory } from './IBasicCategory';
import { ValueAtrib } from './IValueAtrib';

export interface ICatAttribute {
  id?: string;
  hint?: string;
  name?: string;
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
