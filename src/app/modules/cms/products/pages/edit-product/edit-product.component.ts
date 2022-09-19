import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, switchMap } from 'rxjs';
import { Product } from '@models/index';
import { CurrentProdRequest } from 'app/store/currentProd/currentProd.actions';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  currentProdId: string | null = null;
  loading$: Observable<any> = new Observable();
  currentProd!: Product;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    // this.store.dispatch(new SetLoading(true));
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
