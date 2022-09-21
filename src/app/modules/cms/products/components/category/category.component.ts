import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ICategory } from '@models/index';
// import { getCurrentProd } from 'app/state/selectors/currentProd.selector';
import { MatDialog } from '@angular/material/dialog';
import { CategorySearchComponent } from './category-search/category-search.component';
// import { updateCurrentProd } from 'app/state/actions/currentProd.actions';
import { IConfirmDialogData } from '@models/index';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category?: ICategory;

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod.category) this.category = prod.category;
    });
  }

  seachCategory() {
    const dialogRef = this.dialog.open(CategorySearchComponent, {
      minHeight: '610px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const data: IConfirmDialogData = {
          title: '¿Estas seguro?',
          message: `Al cambiar la categoría se eliminan los atributos y variaciones ¿Deseas cambiar la categoría a ${result.id} - ${result.name}?`,
          cancelText: 'No',
          confirmText: 'Si',
        };

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '320px',
          autoFocus: '.actions>button',
          data: data,
        });

        dialogRef.afterClosed().subscribe((confirm) => {
          if (confirm) {
            this.store.dispatch(
              new CurrentProdUpdate({
                property: 'category',
                value: result,
              })
            );
            this.store.dispatch(
              new CurrentProdUpdate({
                property: 'category_id',
                value: result.id,
              })
            );
          }
        });
      }
    });
  }
}
