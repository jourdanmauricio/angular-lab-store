export interface Customer {
  id: number;
  name: string;
  last_name: string;
  phone: string;
  document_type: string;
  document_number: string;
  user_id: number;
}

export interface createCustomerDto extends Omit<Customer, 'id'> {}

export interface updateCustomerDto extends Partial<createCustomerDto> {}
