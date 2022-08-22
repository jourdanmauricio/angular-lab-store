export interface User {
  id: number;
  email: string;
  password: string;
  recovery_token: null;
  role: string;
  created_at: Date;
  updated_at: Date;
  customer: Customer;
  userMl: UserMl;
}

export interface Customer {
  id: number;
  name: string;
  last_name: string;
  phone: string;
  document_type: string;
  document_number: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface UserMl {
  id: number;
  user_id: number;
  ml_user_id: number;
  nickname: string;
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
  end_at: null;
  address: Address;
  buyer_reputation: BuyerReputation;
  company: Company;
  country_id: string;
  email: string;
  first_name: string;
  gender: string;
  identification: Identification;
  last_name: string;
  logo: null;
  permalink: string;
  phone: Phone;
  seller_reputation: SellerReputation;
  site_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Address {
  city: string;
  state: string;
  address: string;
  zip_code: string;
}

export interface BuyerReputation {
  tags: any[];
  transactions: BuyerReputationTransactions;
  canceled_transactions: number;
}

export interface BuyerReputationTransactions {
  total: null;
  period: string;
  unrated: Canceled;
  canceled: Canceled;
  completed: null;
  not_yet_rated: NotYetRated;
}

export interface Canceled {
  paid: null;
  total: null;
}

export interface NotYetRated {
  paid: null;
  total: null;
  units: null;
}

export interface Company {
  brand_name: null;
  city_tax_id: string;
  cust_type_id: string;
  state_tax_id: string;
  corporate_name: string;
  identification: string;
  soft_descriptor: null;
}

export interface Identification {
  type: string;
  number: string;
}

export interface Phone {
  number: string;
  verified: boolean;
  area_code: string;
  extension: string;
}

export interface SellerReputation {
  metrics: Metrics;
  level_id: null;
  transactions: SellerReputationTransactions;
  power_seller_status: null;
}

export interface Metrics {
  sales: Sales;
  claims: Cancellations;
  cancellations: Cancellations;
  delayed_handling_time: Cancellations;
}

export interface Cancellations {
  rate: number;
  value: number;
  period: string;
}

export interface Sales {
  period: string;
  completed: number;
}

export interface SellerReputationTransactions {
  total: number;
  period: string;
  ratings: Ratings;
  canceled: number;
  completed: number;
}

export interface Ratings {
  neutral: number;
  negative: number;
  positive: number;
}
