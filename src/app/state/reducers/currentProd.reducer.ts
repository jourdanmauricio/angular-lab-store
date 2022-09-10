import { createReducer, on } from '@ngrx/store';
import { Product } from '@models/index';
import {
  loadedCurrentProd,
  updateCurrentProd,
} from '../actions/currentProd.actions';

export const initialState = {} as Product;

export const currentProdReducer = createReducer(
  initialState,
  on(loadedCurrentProd, (state, { currentProd }) => {
    return { ...state, ...currentProd };
  }),
  on(updateCurrentProd, (state, { property }) => {
    const newstate = { ...state, ...property };
    return { ...state, ...newstate };
  })
);
