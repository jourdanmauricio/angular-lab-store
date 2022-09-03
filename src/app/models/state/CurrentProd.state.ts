import { Product } from './../product.model';

export interface CurrentProdState {
  loading: boolean;
  currentProd: Product;
}
