import { ValueType } from '@core/data/enums';
import { ApiBasicCategory } from '@models/category/IBasicCategory';
import { ValueAtrib } from '@models/category/IValueAtrib';
import { Tags } from '..';

export interface IAttribute {
  id: string;
  name: string;
  value_id?: any;
  value_name: string;
  value_struct?: any;
}

export interface IAttributeWork extends IAttribute {
  tags?: Tags;
  value_type?: ValueType;
  values?: ValueAtrib[];
  allowed_units?: ApiBasicCategory[];
  default_unit?: string;
  hint?: string;
  value_max_length?: number;
  tooltip?: string;
  updated?: boolean;
}
