import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadCurrentProd } from 'app/state/actions/currentProd.actions';
import { Observable, switchMap } from 'rxjs';
import { Product } from '@models/product.model';
import { selectLoading } from 'app/state/selectors/application.selector';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  currentProdId: string | null = null;
  loading$: Observable<any> = new Observable();
  currentProd!: Product;

  constructor(private route: ActivatedRoute, private store: Store<any>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.currentProdId = params.get('id');
          if (this.currentProdId) {
            this.store.dispatch(loadCurrentProd({ id: this.currentProdId }));
          }
          return [];
        })
      )
      .subscribe();
  }
}
