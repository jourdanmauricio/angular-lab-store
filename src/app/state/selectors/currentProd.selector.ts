import { createSelector } from '@ngrx/store';
import { CurrentProdState } from 'src/app/models/state/CurrentProd.state';
import { AppState } from '../app.state';

export const selectCurrentProd = (state: AppState) => state.currentProd;

export const selectCurrentProdProd = createSelector(
  selectCurrentProd,
  (state: CurrentProdState) => state.currentProd
);

export const selectLoading = createSelector(
  selectCurrentProd,
  (state: CurrentProdState) => state.loading
);
