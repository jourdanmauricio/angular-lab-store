import { Injectable } from '@angular/core';
import { IProdWebState } from '@models/index';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { MessageService } from 'app/services/message.service';
import { ProductsService } from 'app/services/products.service';
import { ProdWebRequest, ProdWebReset, ProdWebUpdate } from './prodWeb.actions';

@State<IProdWebState>({
  name: 'prodWeb',
  defaults: {
    prodWeb: null,
    updated: [],
    action: '',
  },
})
@Injectable()
export class ProdWebState {
  constructor(
    private productsService: ProductsService,
    private store: Store,
    private messageService: MessageService
  ) {}

  @Selector()
  static getProdWeb(state: IProdWebState): any {
    return state.prodWeb;
  }

  @Action(ProdWebRequest)
  async prodWebRequest(
    ctx: StateContext<IProdWebState>,
    { payload }: ProdWebRequest
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      prodWeb: { ...state.prodWeb, ...payload.prod },
      action: payload.action,
    });
  }

  @Action(ProdWebUpdate)
  prodWebUpdate(ctx: StateContext<IProdWebState>, { payload }: ProdWebUpdate) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      updated: [...state.updated, payload.property],
      prodWeb: { ...state.prodWeb, ...{ [payload.property]: payload.value } },
    });
  }

  @Action(ProdWebReset)
  prodWebReset(ctx: StateContext<IProdWebState>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      prodWeb: null,
      updated: [],
      action: '',
    });
  }
}
