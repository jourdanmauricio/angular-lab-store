import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, switchMap } from 'rxjs';
import { IprodState, Product } from '@models/index';
import { CurrentProdRequest } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  currentProdId: string | null = null;
  loading$: Observable<any> = new Observable();
  currentProd!: Product;
  updated!: string[];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private productsService: ProductsService
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
        this.updated = upd;
      }
    });
  }

  updateProduct() {
    console.log('this.currentProd', this.currentProd);
    console.log('this.updated', this.updated);
    if (this.currentProd) {
      let body: IprodState = {};
      this.updated.forEach((field) => {
        switch (field) {
          case 'status':
            body.status = this.currentProd.status;
            break;
          case 'price':
            body.price = this.currentProd.price;
            break;
        }
      });
      this.productsService
        .updateMlProd(this.currentProd.prodMl!.id, body)
        .subscribe((prod) => console.log('UPDATED', prod));
    }
  }
  /**
   * Update product
   */
  // TODO: Si updated contiene 'variations' chquear que las imagenes de las variaciones
  //       se encuentren en pictures del producto. Insertar las que falten y eliminar
  //       las que sobren. Se deben enviar
  //  [{
  //		"id": "553111-MLA20482692355_112015"
  //	},
  //	{
  //		"id": "629425-MLA25446587248_032017"
  //	}]
}
