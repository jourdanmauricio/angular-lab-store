import { ValueType } from '@core/data/enums';
import { ApiBasicCategory } from '@models/category/IBasicCategory';
import { ValueAtrib } from '@models/category/IValueAtrib';
import { Tags } from '..';

export interface IAttribute {
  id: string;
  name: string;
  value_id?: any;
  value_name?: any;
  value_struct?: any;
}

export interface IAttributeWork extends IAttribute {
  tags?: Tags;
  tags_spec?: string[];
  component?: string;
  group?: string;
  allow_filtering?: boolean;
  allow_custom_value?: boolean;
  value_type?: ValueType;
  values?: ValueAtrib[];
  allowed_units?: ApiBasicCategory[];
  default_unit?: string;
  hint?: string;
  value_max_length?: number;
  tooltip?: string;
  updated?: boolean;
}
