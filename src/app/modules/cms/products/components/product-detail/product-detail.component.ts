import { PortalHostDirective } from '@angular/cdk/portal';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCT_STATUS_ML } from '@core/data/constants';
import { IProductWeb, IProduct } from '@models/index';
import { MessageService } from 'app/services/message.service';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input() element: any;

  optionStatusML = PRODUCT_STATUS_ML;

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  editProduct(product: IProduct) {
    console.log('Edit', product);
    this.router.navigate([`cms/products/edit/${product.id}`]);
  }

  viewMlProduct(product: IProduct) {
    window.open(product.prodMl?.permalink, '_blank');
  }

  migrateWeb(prod: any) {
    let obj: IProductWeb = {
      id: prod.id,
      status: prod.status,
      prod_id: prod.id,
      seller_custom_field: prod.seller_custom_field,
      available_quantity: prod.available_quantity,
      price: prod.price,
      start_time: new Date(),
      permalink: '',
      variations: prod.variations,
    };

    this.productsService.createProductWeb(obj).subscribe({
      next: (prodWeb) => {
        this.element.prodWeb = prodWeb;
        this.messageService.showMsg(
          'Producto migrado correctamente',
          'success'
        );
      },
      error: (err) => {
        this.messageService.showMsg(err.error.message, 'error');
      },
    });
  }
}
