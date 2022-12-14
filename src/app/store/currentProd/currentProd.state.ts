import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { ProductsService } from 'app/services/products.service';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { SetLoading } from '../application/application.actions';
import { CurrentProdRequest, CurrentProdUpdate } from './currentProd.actions';
import { ICurrentProdState, IPicture, IProduct } from '@models/index';
import { MessageService } from 'app/services/message.service';
import { IAttributeWork } from '@models/product/IAttribute';
import { ProdMlRequest } from '../prodMl/prodMl.actions';
import { ProdWebRequest, ProdWebReset } from '../prodWeb/prodWeb.actions';
import { ValueAtrib } from '@models/category/IValueAtrib';

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
  static currentProd(state: ICurrentProdState): any {
    return state.prod ? state.prod : {};
  }

  @Selector()
  static getUpdatedProd(state: ICurrentProdState): any {
    return state.updated;
  }

  @Selector()
  static prodPictures(state: ICurrentProdState): any {
    return state.prod?.pictures;
  }

  @Selector()
  static productSaleTerms(state: ICurrentProdState): any {
    return state.prod?.sale_terms;
  }

  static varPictures(id: string | number) {
    return createSelector([CurrentProdState], (state: ICurrentProdState) => {
      let variPictures: IPicture[] = [];
      let variation = state.prod?.variations?.find((vari) => vari.id === id);
      if (variation) {
        variation.picture_ids.forEach((varPic) => {
          let found = state.prod?.pictures?.find(
            (prodPic) => varPic === prodPic.id
          );
          if (found) variPictures.push(found);
        });
      }
      return variPictures;
    });
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
      // console.log('FOUND', found, atrib);
      if (found) {
        obj.value_name = found.value_name;
        obj.value_struct = found.value_struct;
        obj.value_id = found.value_id;
        obj.updated = found.updated;
        // VALUES
        if (obj.value_id !== '-1') {
          if (obj.hasOwnProperty('values')) {
            console.log('AQUI', obj, found);
            if (obj.tags?.hasOwnProperty('multivalued')) {
              let values_names = found.value_name.split(',');
              obj.value_id = values_names.map((name: string) => {
                let found = obj.values?.find((val) => val.name === name);
                if (!found) {
                  obj.values?.push({ id: name, name });
                }
                return found ? found.id : name;
              });
            } else {
              let found = obj.values?.find(
                (val) => val.name === obj.value_name
              );
              if (!found) {
                obj.values?.push({ id: obj.value_name, name: obj.value_name });
                obj.value_id = obj.value_name;
              }

              console.log('OBJ', obj);
            }
          }
        }

        // VALUES
        // if (obj.tags?.hasOwnProperty('multivalued')) {
        //   obj.value_id = found.value_name.split(',');
        //   obj.values?.map((val) => (val.id = val.name));
        //   console.log('ACA', obj);
        //   obj.value_id.forEach((val: any) => {
        //     if (!obj.values?.includes(val))
        //       obj.values?.push({ id: val, name: val });
        //   });
        // }
        // if (
        //   obj.values &&
        //   obj.values.length > 0 &&
        //   !obj.tags?.hasOwnProperty('multivalued')
        // ) {
        //   if (found.value_id === null) obj.value_id = obj.value_name;
        //   let index = obj.values.findIndex(
        //     (val: any) => val.id === obj.value_id
        //   );
        //   console.log('index', index, found.values, obj.value_id);
        //   if (index === -1) {
        //     if (!found.value_id) obj.value_id = obj.value_name;
        //     console.log('PUSH');
        //     obj.values.push({
        //       id: obj.value_id,
        //       name: obj.value_name,
        //     });
        //     // obj.values = [
        //     //   ...obj.values,
        //     //   // {
        //     //   //   id: found.value_id,
        //     //   //   name: found.value_name,
        //     //   // },
        //     //   {
        //     //     id: found.value_id === null ? found.value_name : found.value_id,
        //     //     name: found.value_name,
        //     //   },
        //     // ];
        //   }
        // }
        totalAttribs.push(obj);
      } else {
        totalAttribs.push(obj);
      }
    });
    return totalAttribs;
  }

  @Action(CurrentProdRequest)
  async currentProdRequest(
    ctx: StateContext<ICurrentProdState>,
    { payload }: CurrentProdRequest
  ) {
    return this.productsService.getProduct(payload.prod).pipe(
      tap((res: IProduct) => {
        res.prodMl!.price = parseFloat(res.prodMl?.price);
        if (res.prodMl)
          this.store.dispatch(
            new ProdMlRequest({ action: payload.action, prod: res.prodMl })
          );
      }),
      tap((res) => {
        if (res.prodWeb) {
          res.prodWeb!.price = parseFloat(res.prodWeb?.price);
          this.store.dispatch(
            new ProdWebRequest({ action: payload.action, prod: res.prodWeb })
          );
        } else {
          this.store.dispatch(new ProdWebReset());
        }
      }),
      tap((res) => {
        let prod = res;
        delete prod.prodMl;
        delete prod.prodWeb;
        prod.price = parseFloat(prod.price);

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
}
