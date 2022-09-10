import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProductsService } from 'app/services/products.service';

@Injectable()
export class CurrentProdEffects {
  loadCurrentProd$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Product Edit] Load currentProd'),
      switchMap((action: any) =>
        this.productService.getProduct(action.id).pipe(
          map((currentProd) => {
            return {
              type: '[Product Edit] Loaded currentProd',
              currentProd,
            };
          }),
          // map((currentProd) => {
          //   return {
          //     type: '[Product Edit] Loaded success',
          //     currentProd,
          //   };
          // }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}
}
