import { Picture } from './picture.model';

export interface Settings {
  status: string;
  hintSku: false;
  pictures: Picture[];
  condition: string;
  listing_type_id: string;
  price_percent_ml: number;
  price_percent_web: number;
}
