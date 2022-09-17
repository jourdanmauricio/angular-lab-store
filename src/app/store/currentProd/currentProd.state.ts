import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ProductsService } from 'app/services/products.service';
import { catchError, delay, mergeMap, of, tap } from 'rxjs';
import { SetLoading } from '../application/application.actions';
import { CurrentProdRequest, CurrentProdUpdate } from './currentProd.actions';

import {
  ICatAttribute,
  ICurrentProdState,
  IprodState,
  Tags,
} from '@models/index';
import { MessageService } from 'app/services/message.service';
import { IAttribute } from '@models/product/IAttribute';
import { ValueAtrib } from '@models/category/IValueAtrib';
import { ValueType } from '@core/constants/enums';
import { ApiBasicCategory } from '@models/category/IBasicCategory';

export interface Attribute {
  id?: string;
  name?: string;
  tags?: Tags;
  value_type?: ValueType;
  values?: ValueAtrib[];
  value_id?: string;
  value_name?: string;
  value_struct: any;
  allowed_units?: ApiBasicCategory[];
  default_unit?: string;
  type?: string;
  hint?: string;
  hierarchy?: any;
  relevance?: number;
  value_max_length?: number;
  attribute_group_id?: string;
  attribute_group_name?: string;
  tooltip?: string;
}

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
    // let totalAtribs: ICatAttribute[] = [];
    const catAttribs = state.prod?.category?.attributes?.filter(
      (attribute) =>
        !attribute.tags?.hasOwnProperty('hidden') &&
        !attribute.tags?.hasOwnProperty('allow_variations') &&
        !attribute.tags?.hasOwnProperty('variation_attribute') &&
        !attribute.tags?.hasOwnProperty('read_only')
    );

    return catAttribs ? catAttribs : null;
    // catAttribs?.forEach((cat) => {
    //   console.log('catAttribs!!!!!!!!!!!!!!!!!!!!!', cat);
    //   let found = state.prod?.attributes?.find((prod) => prod.id === cat.id);
    //   if (found) {
    //     let obj: ICatAttribute = found;
    //     obj.value_type = cat.value_type;
    //     obj.tags = cat.tags;
    //     obj.values = cat.values;
    //     obj.allowed_units = cat.allowed_units;
    //     return obj;
    //     // totalAtribs.push(obj);
    //   } else {
    //     console.log('atrib', cat);
    //     // totalAtribs.push(cat);
    //     return cat;
    //   }
    // });
    // // return totalAtribs;
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
    let atribssss: ICatAttribute[] = [];
    catAttributes.map((atrib: any) => {
      let obj: Attribute = JSON.parse(JSON.stringify(atrib));
      let found = prodAttributes.find((el: any) => el.id === atrib.id);
      if (found) {
        obj.value_name = found.value_name;
        obj.value_struct = found.value_struct;
        obj.value_id = found.value_id;
        if (obj.tags?.hasOwnProperty('multivalued')) {
          obj.value_id = found.value_name.split(',');
          obj.values?.map((val) => (val.id = val.name));
        }

        // &&!obj.tags?.hasOwnProperty('multivalued')
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
        atribssss.push(obj);
      } else {
        atribssss.push(obj);
      }
    });
    return atribssss;
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
