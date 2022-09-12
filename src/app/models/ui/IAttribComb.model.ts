export interface IAttribComb {
  id: string;
  name: string;
  active: boolean;
  source: 'category' | 'custom' | 'product';
  values?: any;
}
