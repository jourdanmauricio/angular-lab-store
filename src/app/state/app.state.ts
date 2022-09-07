import { ActionReducerMap } from '@ngrx/store';
import { UserState } from '../models/state/User.state';
import { currentProdReducer } from './reducers/currentProd.reducer';
import { UserReducer } from './reducers/user.reducer';
import { ApplicationReducer } from './reducers/application.reducer';
import { ApplicationState } from '../models/state/Application.state';
import { SettingsState } from '../models/state/SettingsState.state';
import { SettingsReducer } from './reducers/settings.reducer';
import { Product } from '../models/product.model';

export interface AppState {
  currentProd: Product;
  user: UserState;
  application: ApplicationState;
  setttings: SettingsState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  currentProd: currentProdReducer,
  user: UserReducer,
  application: ApplicationReducer,
  setttings: SettingsReducer,
};
