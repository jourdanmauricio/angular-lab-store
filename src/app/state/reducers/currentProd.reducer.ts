import { createReducer, on } from '@ngrx/store';
import { CurrentProdState } from 'src/app/models/state/CurrentProd.state';
import {
  loadCurrentProd,
  loadedCurrentProd,
} from '../actions/currentProd.actions';

export const initialState: CurrentProdState = {
  loading: false,
  currentProd: {
    id: 0,
    title: '',
    listing_type_id: '',
    sale_terms: [],
    permalink: '',
    thumbnail: '',
    attributes: [],
    variations: [],
    status: '',
    available_quantity: 0,
    start_time: new Date(Date.now()),
    pictures: [],
    category_id: '',
    price: 0,
    sold_quantity: 0,
    condition: '',
    seller_custom_field: '',
    description: '',
  },
};

export const currentProdReducer = createReducer(
  initialState,
  on(loadCurrentProd, (state) => {
    return { ...state, loading: true };
  }),
  on(loadedCurrentProd, (state, { currentProd }) => {
    return { ...state, loading: false, currentProd };
  })
);
