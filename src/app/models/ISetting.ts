import {
  CONDITION,
  PROD_LISTING_TYPE,
  PROD_STATUS,
} from '@core/constants/enums';
import { IPicture } from './index';

export interface ISettings {
  status: PROD_STATUS;
  hintSku: false;
  pictures: IPicture[];
  condition: CONDITION;
  listing_type_id: PROD_LISTING_TYPE;
  price_percent_ml: number;
  price_percent_web: number;
}
