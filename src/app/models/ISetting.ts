import {
  ProdCondition,
  ProdListingType,
  ProdStatus,
} from '@core/constants/enums';
import { IPicture } from './index';

export interface ISettings {
  status: ProdStatus;
  hintSku: false;
  pictures: IPicture[];
  condition: ProdCondition;
  listing_type_id: ProdListingType;
  price_percent_ml: number;
  price_percent_web: number;
}
