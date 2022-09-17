import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ProductsService } from 'app/services/products.service';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { SetLoading } from '../application/application.actions';
import { CurrentProdRequest, CurrentProdUpdate } from './currentProd.actions';
import { ICatAttribute, ICurrentProdState, IprodState } from '@models/index';
import { MessageService } from 'app/services/message.service';
import { IAttributeWork } from '@models/product/IAttribute';

@State<ICurrentProdState>({
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
    private store: Store,
    private messageService: MessageService
  ) {}

  @Selector()
  static currentProd(state: ICurrentProdState): IprodState {
    return state.prod ? state.prod : {};
  }

  @Selector()
  static catAttributes(state: ICurrentProdState): any {
    const catAttribs = state.prod?.category?.attributes?.filter(
      (attribute) =>
        !attribute.tags?.hasOwnProperty('hidden') &&
        !attribute.tags?.hasOwnProperty('allow_variations') &&
        !attribute.tags?.hasOwnProperty('variation_attribute') &&
        !attribute.tags?.hasOwnProperty('read_only')
    );
    return catAttribs ? catAttribs : null;
  }

  @Selector()
  static catVarAttributes(state: ICurrentProdState): any {
    const catAttribs = state.prod?.category?.attributes?.filter(
      (attribute) =>
        // !attribute.tags?.hasOwnProperty('hidden') &&
        !attribute.tags?.hasOwnProperty('allow_variations') &&
        attribute.tags?.hasOwnProperty('variation_attribute') &&
        !attribute.tags?.hasOwnProperty('read_only')
    );
    return catAttribs ? catAttribs : null;
  }

  @Selector()
  static prodAttributes(state: ICurrentProdState): any {
    return state.prod?.attributes;
  }

  @Selector([CurrentProdState.catAttributes, CurrentProdState.prodAttributes])
  static totalAttribs(
    state: ICurrentProdState,
    catAttributes: any,
    prodAttributes: any
  ) {
    let totalAttribs: IAttributeWork[] = [];
    catAttributes.map((atrib: any) => {
      let obj: IAttributeWork = JSON.parse(JSON.stringify(atrib));
      let found = prodAttributes.find((el: any) => el.id === atrib.id);
      if (found) {
        obj.value_name = found.value_name;
        obj.value_struct = found.value_struct;
        obj.value_id = found.value_id;
        if (obj.tags?.hasOwnProperty('multivalued')) {
          obj.value_id = found.value_name.split(',');
          obj.values?.map((val) => (val.id = val.name));
        }
        if (
          obj.values &&
          obj.values.length > 0 &&
          !obj.tags?.hasOwnProperty('multivalued')
        ) {
          let index = found.values.findIndex(
            (val: any) => val.value_id === obj.value_id
          );
          if (index === -1) {
            if (found.value_id === null) obj.value_id = obj.value_name;
            obj.values = [
              ...obj.values,
              // {
              //   id: found.value_id,
              //   name: found.value_name,
              // },
              {
                id: found.value_id === null ? found.value_name : found.value_id,
                name: found.value_name,
              },
            ];
          }
        }
        totalAttribs.push(obj);
      } else {
        totalAttribs.push(obj);
      }
    });
    return totalAttribs;
  }

  @Action(CurrentProdUpdate)
  currentProdUpdate(
    ctx: StateContext<ICurrentProdState>,
    { payload }: CurrentProdUpdate
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      updated: [...state.updated, payload.property],
      prod: { ...state.prod, ...{ [payload.property]: payload.value } },
    });
  }

  @Action(CurrentProdRequest)
  async currentProdRequest(
    ctx: StateContext<ICurrentProdState>,
    { payload }: CurrentProdRequest
  ) {
    return this.productsService.getProduct(payload.prod).pipe(
      tap((prod) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          prod: { ...state.prod, ...prod },
          action: payload.action,
        });
      }),
      mergeMap(() => this.store.dispatch(new SetLoading(false))),
      catchError((err) => {
        this.store.dispatch(new SetLoading(false));
        this.messageService.showMsg(
          'Error obteniendo datos del producto',
          'error'
        );
        return of(err);
      })
    );
  }
}