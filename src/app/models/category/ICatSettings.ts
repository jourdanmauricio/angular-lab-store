export interface ICatSettings {
  tags: any[];
  price: string;
  stock: string;
  status: string;
  fragile: boolean;
  vertical: string;
  currencies: string[];
  buying_modes: string[];
  restrictions: any[];
  sub_vertical: string;
  subscribable: boolean;
  adult_content: boolean;
  maximum_price: null;
  minimum_price: number;
  vip_subdomain: string;
  buying_allowed: boolean;
  catalog_domain: string;
  coverage_areas: string;
  seller_contact: string;
  item_conditions: string[];
  listing_allowed: boolean;
  mirror_category: null;
  rounded_address: boolean;
  simple_shipping: string;
  max_title_length: number;
  shipping_options: string[];
  shipping_profile: string;
  immediate_payment: string;
  reservation_allowed: string;
  max_sub_title_length: number;
  items_reviews_allowed: boolean;
  max_pictures_per_item: number;
  max_description_length: number;
  max_variations_allowed: number;
  maximum_price_currency: string;
  minimum_price_currency: string;
  mirror_master_category: null;
  mirror_slave_categories: any[];
  show_contact_information: boolean;
  buyer_protection_programs: string[];
  max_pictures_per_item_var: number;
}
