export interface ProductMl {
  id: string;
  prod_id?: number;
  seller_custom_field: string;
  price: string;
  available_quantity: number;
  status: string;
  permalink: string;
  start_time: Date;
  variations: any[];
}
