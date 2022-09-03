import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const loadCurrentProd = createAction(
  '[Product Edit] Load currentProd',
  props<{ id: string }>()
);

export const loadedCurrentProd = createAction(
  '[Product Edit] Loaded success',
  props<{ currentProd: Product }>()
);
