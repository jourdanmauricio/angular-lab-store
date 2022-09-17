export interface ICustomer {
  id: number;
  name: string;
  last_name: string;
  phone: string;
  document_type: string;
  document_number: string;
  user_id: number;
}

export interface createCustomerDto extends Omit<ICustomer, 'id'> {}

export interface updateCustomerDto extends Partial<createCustomerDto> {}
