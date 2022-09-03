import { ActionReducerMap } from '@ngrx/store';
import { CurrentProdState } from '../models/state/CurrentProd.state';
import { UserState } from '../models/state/User.state';
import { LoginState } from '../models/state/Login.state';
import { currentProdReducer } from './reducers/currentProd.reducer';
import { LoginReducer } from './reducers/login.reducer';
import { UserReducer } from './reducers/user.reducer';

export interface AppState {
  currentProd: CurrentProdState;
  user: UserState;
  token: LoginState;
  // products: ReadonlyArray<Product>
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  currentProd: currentProdReducer,
  user: UserReducer,
  token: LoginReducer,
};
