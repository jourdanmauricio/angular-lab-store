import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, Observable, switchMap } from 'rxjs';
import {
  IProdUpdDto,
  IProductDto,
  IVariationUpdDto,
  IProduct,
  IProductWeb,
  IProdMlUpdDto,
  IProdWebUpdDto,
} from '@models/index';
import { CurrentProdRequest } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';
import { ProductsService } from 'app/services/products.service';
import {
  handleBodyLocalMlWeb,
  handleBodyMl,
  removeDuplicates,
} from 'app/utils/functions';
import { IProductMl } from '@models/index';
import { ProdMlState } from 'app/store/prodMl/prodMl.state';
import { MessageService } from 'app/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProdWebState } from 'app/store/prodWeb/prodWeb.state';
import { identifierName, visitAll } from '@angular/compiler';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  currentProdId: string | null = null;
  loading$: Observable<any> = new Observable();
  currentProd!: IProductDto;
  prodMl!: IProductMl;
  prodWeb!: IProductWeb;
  updatedProd!: string[];
  updatedProdMl!: string[];
  updatedProdWeb!: string[];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private productsService: ProductsService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.currentProdId = params.get('id');
          if (this.currentProdId) {
            this.store.dispatch(
              new CurrentProdRequest({
                action: 'edit',
                prod: this.currentProdId,
              })
            );
          }
          return [];
        })
      )
      .subscribe();

    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod) {
        this.currentProd = prod;
      }
    });
    this.store.select(ProdMlState.getProdMl).subscribe((prod) => {
      if (prod) {
        this.prodMl = prod;
      }
    });
    this.store.select(ProdWebState.getProdWeb).subscribe((prod) => {
      if (prod) {
        this.prodWeb = prod;
      }
    });
    this.store.select(CurrentProdState.getUpdatedProd).subscribe((upd) => {
      if (upd) {
        this.updatedProd = upd;
      }
    });
    this.store.select(ProdMlState.getUpdatedProdMl).subscribe((upd) => {
      if (upd) {
        this.updatedProdMl = upd;
      }
    });
    this.store.select(ProdWebState.getUpdatedProdWeb).subscribe((upd) => {
      if (upd) {
        this.updatedProdWeb = upd;
      }
    });
  }

  updateProduct() {
    // Delete actions duplicates
    this.updatedProd = removeDuplicates(this.updatedProd);
    this.updatedProdMl = removeDuplicates(this.updatedProdMl);
    this.updatedProdWeb = removeDuplicates(this.updatedProdWeb);

    // Create Json for Local Api, and if necessary for Mercado Libre
    const { bodyMl, bodyMlDescription, body } = handleBodyLocalMlWeb(
      this.currentProd,
      this.updatedProd
    );

    if (this.updatedProd.length > 0) {
      /**
       * Impact changes in Mercado libre, and update in Local
       */
      if (Object.keys(bodyMl).length > 0)
        this.productsService
          .updateMlLocalService(this.prodMl.id, bodyMl, this.currentProd)
          .subscribe({
            next: () => {
              this.messageService.showMsg('Producto actualizado', 'success');
              this.router.navigate(['cms/products']);
            },
            error: (err: HttpErrorResponse) => {
              let message = '';
              if (err.error) {
                err.error.cause.forEach((errDesc: any) => {
                  message += `${errDesc.type} - ${errDesc.message} \n`;
                });
              }
              console.log('ERRRRRORRRRR MLLLLL', err);
              this.messageService.showMsg(message, 'error');
            },
          });

      /**
       * Update Description
       */
      if (Object.keys(bodyMlDescription).length > 0)
        this.productsService
          .updateMlLocalProdDescriptionService(
            this.prodMl.id,
            this.currentProd.id,
            bodyMlDescription,
            this.currentProd.description
          )
          .subscribe({
            next: () => {
              this.messageService.showMsg('Producto actualizado', 'success');
              this.router.navigate(['cms/products']);
            },
            error: (err) => {
              console.log('ERRRRRORRRRR MLLLLL', err);
              this.messageService.showMsg(err, 'error');
            },
          });

      /**
       * Update product
       */
      if (Object.keys(body).length > 0)
        this.productsService
          .updateProduct(this.currentProd.id, body)
          .subscribe({
            next: () => {
              this.messageService.showMsg('Producto actualizado', 'success');
              this.router.navigate(['cms/products']);
            },
            error: (err) => {
              console.log('ERRRRRORRRRR MLLLLL', err);
              this.messageService.showMsg(err, 'error');
            },
          });
    }

    // Create Json for ML
    if (this.updatedProdMl.length > 0) {
      const bodyMl = handleBodyMl(this.prodMl, this.updatedProdMl);

      if (Object.keys(bodyMl).length > 0)
        this.productsService
          .updateMlLocalMlService(this.prodMl.id, this.prodMl.prod_id!, bodyMl)
          .subscribe({
            next: () => {
              this.messageService.showMsg('Producto actualizado', 'success');
              this.router.navigate(['cms/products']);
            },
            error: (err: HttpErrorResponse) => {
              let message = '';
              if (err.error) {
                err.error.cause.forEach((errDesc: any) => {
                  message += `${errDesc.type} - ${errDesc.message} \n`;
                });
              }
              console.log('ERRRRRORRRRR MLLLLL', err);
              this.messageService.showMsg(message, 'error');
            },
          });
    }

    if (this.updatedProdWeb.length > 0) {
      console.log('updatedProdWeb', this.updatedProdWeb);

      let obj: IProdWebUpdDto = {
        id: this.prodWeb.id,
        available_quantity: this.prodWeb.available_quantity,
        status: this.prodWeb.status,
        price: this.prodWeb.price,
        variations: this.prodWeb.variations,
      };

      this.productsService.updateProductWeb(obj).subscribe({
        next: () => {
          this.messageService.showMsg('Producto actualizado', 'success');
          this.router.navigate(['cms/products']);
        },
        error: (err) => console.log('ERRRRRORRRRR MLLLLL', err),
      });
    }
  }
  /**
   * Update product
   */

  // TODO 2: Attributes. Si value_type = 'number_unit' -> verificar
  // value_struct: {number: value,  unit: value} o value_name: 'value value'
  // TODO 3: Precio mínimo -> Analizar si agregar a configuración
  // TODO 4: Cantidad de imágenes en variaciones y en prod. Too agegar a componentes.
  // Se obtiene de la categoría
}
