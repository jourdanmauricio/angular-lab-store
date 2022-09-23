import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, Observable, switchMap } from 'rxjs';
import {
  IProdUpdDto,
  IProductDto,
  IVariationUpdDto,
  IProduct,
} from '@models/index';
import { CurrentProdRequest } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';
import { ProductsService } from 'app/services/products.service';
import { removeDuplicates } from 'app/utils/functions';
import { IProductMl } from '@models/index';
import { ProdMlState } from 'app/store/prodMl/prodMl.state';
import { MessageService } from 'app/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  currentProdId: string | null = null;
  prodMl!: IProductMl;
  loading$: Observable<any> = new Observable();
  currentProd!: IProductDto;
  updatedProd!: string[];

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
    this.store.select(CurrentProdState.prodUpdated).subscribe((upd) => {
      if (upd) {
        this.updatedProd = upd;
      }
    });
    this.store.select(ProdMlState.getProdMl).subscribe((prod) => {
      if (prod) {
        this.prodMl = prod;
      }
    });
  }

  updateProduct() {
    this.updatedProd = removeDuplicates(this.updatedProd);
    console.log('currentProd', this.currentProd);
    console.log('prodMl', this.prodMl);
    console.log('this.updated', this.updatedProd);
    if (this.currentProd) {
      let bodyMl: any = {};
      let bodyMlDescription: any = {};
      let body: any = {};
      this.updatedProd.forEach((field) => {
        switch (field) {
          case 'available_quantity':
            body.available_quantity = this.currentProd.available_quantity;
            break;
          case 'attributes':
            let attributes = this.currentProd.attributes.map((attrib) => {
              return attrib.updated === true
                ? {
                    id: attrib.id,
                    name: attrib.name,
                    value_id: attrib.tags?.hasOwnProperty('multivalued')
                      ? null
                      : attrib.value_id,
                    value_name: attrib.value_name,
                  }
                : { id: attrib.id };
            });
            bodyMl.attributes = attributes;
            break;
          case 'condition':
            bodyMl.condition = this.currentProd.condition;
            break;
          case 'description':
            bodyMlDescription.plain_text = this.currentProd.description;
            break;
          case 'pictures':
            bodyMl.pictures = this.currentProd.pictures.map((pic) => ({
              id: pic.id,
            }));
            break;
          case 'price':
            body.price = this.currentProd.price;
            break;
          case 'sale_terms':
            bodyMl.sale_terms = this.currentProd.sale_terms;
            break;
          case 'seller_custom_field':
            bodyMl.seller_custom_field = this.currentProd.seller_custom_field;
            break;
          case 'status':
            body.status = this.currentProd.status;
            break;
          case 'title':
            bodyMl.title = this.currentProd.title;
            break;
          case 'variations':
            console.log('variations', this.currentProd.variations);
            let variations: IVariationUpdDto[] = [];
            let pictures: { id: string }[] = [];
            this.currentProd.variations.forEach((variation) => {
              variation.picture_ids.forEach((picture) => {
                if (pictures.findIndex((pic) => pic.id === picture) === -1)
                  pictures.push({ id: picture });
              });

              let obj = {} as IVariationUpdDto;
              if (variation.updated === true) {
                obj = {
                  attribute_combinations: variation.attribute_combinations,
                  attributes: variation.attributes,
                  picture_ids: variation.picture_ids,
                };
                // Upd
                if (typeof variation.id === 'number') {
                  obj.id = variation.id;
                } else {
                  // New
                  obj.available_quantity = variation.available_quantity;
                  obj.price = variation.price;
                }
              } else {
                obj = { id: variation.id };
              }
              variations.push(obj);
            });
            bodyMl.variations = variations;
            bodyMl.pictures = pictures;
            break;
          case 'video_id':
            bodyMl.video_id = this.currentProd.video_id;
            break;
        }
      });
      console.log('SEND ML', bodyMl);
      console.log('SEND LOCAL', body);
      /**
       * Update product con datos de ML
       */
      if (Object.keys(bodyMl).length > 0)
        this.productsService
          .updateMlProd(this.prodMl.id, bodyMl)
          .pipe(
            map((prodMl) => {
              // Variations
              prodMl.variations.forEach((variation) => {
                let found = this.currentProd.variations.find(
                  (prodVar) => prodVar.id === variation.id
                );
                if (found) {
                  variation.price = found.price;
                  variation.available_quantity = found.available_quantity;
                }
              });
              return {
                ...prodMl,
                status: this.currentProd.status,
                available_quantity: this.currentProd.available_quantity,
                price: this.currentProd.price,
              };
            }),

            switchMap((newProdMl: IProduct) =>
              this.productsService.updateProduct(this.currentProd.id, newProdMl)
            )
          )
          .subscribe({
            next: () => {
              this.messageService.showMsg('Producto actualizado', 'success');
              this.router.navigate(['cms/products']);
            },
            error: (err: HttpErrorResponse) => {
              let message = '';
              if (err.error) {
                err.error.cause.forEach((errDesc: any) => {
                  message += `${errDesc.type} - ${errDesc.message} <br>`;
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
          .updateMlProdDescription(this.prodMl.id, bodyMlDescription)
          .pipe(
            map((prodMl) => ({
              ...prodMl,
              description: this.currentProd.description,
            })),
            switchMap((newProd: IProdUpdDto) =>
              this.productsService.updateProduct(this.currentProd.id, newProd)
            )
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
  }
  /**
   * Update product
   */
  // TODO 1: Si updated contiene 'variations' chequear que las imagenes de las variaciones
  //       se encuentren en pictures del producto. Insertar las que falten y eliminar
  //       las que sobren. Se deben enviar:
  //	{
  //		"id": "629425-MLA25446587248_032017"
  //	}]
  //
  // TODO 2: Attributes. Si value_type = 'number_unit' -> verificar
  // value_struct: {number: value,  unit: value} o value_name: 'value value'
  // TODO 3: Precio mínimo -> Analizar si agregar a configuración
  // TODO 4: Cantidad de imágenes en variaciones y en prod. Too agegar a componentes.
  // Se obtiene de la categoría
}

export interface Anterior {
  id: string;
  value: string;
}

export interface Nueva extends Pick<Anterior, 'value'> {}
