import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ProductsService } from 'app/services/products.service';
import { tap } from 'rxjs';
import { SetLoading } from '../application/application.actions';
import {
  CurrentProdRequest,
  CurrentProdStateModel,
  CurrentProdUpdate,
  ICurrentProd,
} from './currentProd.actions';

@State<CurrentProdStateModel>({
  name: 'currentProd',
  defaults: {
    prod: null,
    updated: [],
    action: '',
  },
})
@Injectable()
export class CurrentProdState {
  constructor(
    private productsService: ProductsService,
    private store: Store // private messageService: MessageService
  ) {}

  @Selector()
  static currentProd(state: CurrentProdStateModel): ICurrentProd {
    return state.prod ? state.prod : {};
  }
  @Action(CurrentProdUpdate)
  currentProdUpdate(
    ctx: StateContext<CurrentProdStateModel>,
    { payload }: CurrentProdUpdate
  ) {
    const state = ctx.getState();
    const property = payload.property;
    const value = payload.value;
    ctx.setState({
      ...state,
      updated: [...state.updated, payload.property],
      prod: { ...state.prod, ...{ [payload.property]: payload.value } },
    });
  }

  @Action(CurrentProdRequest)
  async currentProdRequest(
    ctx: StateContext<CurrentProdStateModel>,
    { payload }: CurrentProdRequest
  ) {
    // this.store.dispatch(new SetLoading(true));
    return this.productsService.getProduct(payload.prod).pipe(
      // tap(() => this.store.dispatch(new SetLoading(false))),
      tap((prod) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          prod: { ...state.prod, ...prod },
          action: payload.action,
        });
      })
    );
  }
}
