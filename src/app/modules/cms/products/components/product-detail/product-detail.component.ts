import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCT_STATUS_ML } from '@core/constants/constants';
import { IprodState, IProduct, Product } from '@models/IProduct';
import { ProductMl } from '@models/productML.model';
import { MessageService } from 'app/services/message.service';
import { ProductsMlService } from 'app/services/products-ml.service';
import { ProductsService } from 'app/services/products.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input() element: any;

  optionStatusML = PRODUCT_STATUS_ML;

  constructor(
    private productsService: ProductsService,
    private productsMlService: ProductsMlService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSelected(e: any) {
    console.log('Select ', e);
    const field = e.field;
    const value = e.value;
    const mlId = e.mlId;
    const id = e.id;

    let body: IprodState = {};
    switch (field) {
      case 'status':
        body.status = value;
        break;
      case 'available_quantity':
        body.available_quantity = value;
        break;
      case 'price':
        body.price = value;
        break;
    }
    this.productsService
      .updateMlProd(mlId, body)
      .pipe(
        map((resMlprod: ProductMl) => ({
          id: mlId,
          prod_id: id,
          seller_custom_field: resMlprod.seller_custom_field,
          price: resMlprod.price.toString(),
          available_quantity: resMlprod.available_quantity,
          status: resMlprod.status,
          permalink: resMlprod.permalink,
          start_time: resMlprod.start_time,
          variations: resMlprod.variations,
        })),
        switchMap((mlProd: ProductMl) =>
          this.productsMlService.updateProductMl(mlProd)
        )
      )
      .subscribe({
        next: () =>
          this.messageService.showMsg('Producto modificado', 'success'),
        error: (err) => {
          let message = 'Error modificando el producto';
          console.log('ERRRRRRRRORRRRRRRRR', err);
          if (err.status === HttpStatusCode.BadRequest) {
            err.error.cause.map((motive: any) => {
              if (motive.cause_id === 101)
                message = 'La cantidad no puede ser menor que 0';
            });
          }
          this.messageService.showMsg(message, 'error');
        },
      });
  }

  editProduct(product: IProduct) {
    console.log('Edit', product);
    this.router.navigate([`cms/products/edit/${product.id}`]);
  }

  viewMlProduct(product: IProduct) {
    window.open(product.prodMl?.permalink, '_blank');
  }
}
