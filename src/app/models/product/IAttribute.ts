import { ValueType } from '@core/constants/enums';
import { ApiBasicCategory } from '@models/category/IBasicCategory';
import { ValueAtrib } from '@models/category/IValueAtrib';
import { Tags } from '..';

export interface IAttribute {
  id?: string;
  name?: string;
  value_id?: null | string;
  value_name?: null | string;
  value_struct?: null;
  // values?: ValueAtrib[];
  // value_type?: ValueType;
  // tags?: Tags;
  // allowed_units?: ApiBasicCategory[];
  attribute_group_id?: any;
  attribute_group_name?: any;
}
