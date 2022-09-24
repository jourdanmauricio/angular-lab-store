import { Injectable } from '@angular/core';
import { IProdMlState } from '@models/index';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { MessageService } from 'app/services/message.service';
import { ProductsService } from 'app/services/products.service';
import { ProdMlRequest, ProdMlUpdate } from './prodMl.actions';

@State<IProdMlState>({
  name: 'prodMl',
  defaults: {
    prodMl: null,
    updated: [],
    action: '',
  },
})
@Injectable()
export class ProdMlState {
  constructor(
    private productsService: ProductsService,
    private store: Store,
    private messageService: MessageService
  ) {}

  @Selector()
  static getProdMl(state: IProdMlState): any {
    return state.prodMl ? state.prodMl : {};
  }

  @Selector()
  static getUpdatedProdMl(state: IProdMlState): any {
    return state.updated;
  }

  @Action(ProdMlRequest)
  async prodMlRequest(
    ctx: StateContext<IProdMlState>,
    { payload }: ProdMlRequest
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      prodMl: { ...state.prodMl, ...payload.prod },
      action: payload.action,
    });
  }

  @Action(ProdMlUpdate)
  currentProdUpdate(
    ctx: StateContext<IProdMlState>,
    { payload }: ProdMlUpdate
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      updated: [...state.updated, payload.property],
      prodMl: { ...state.prodMl, ...{ [payload.property]: payload.value } },
    });
  }
}
