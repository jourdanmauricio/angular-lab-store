import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from '@models/category.model';
import { getCurrentProd } from 'app/state/selectors/currentProd.selector';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CategorySearchComponent } from './category-search/category-search.component';
import { ModalNewCategoryComponent } from '@modules/cms/components/categories/modal-new-category/modal-new-category.component';
import { updateCurrentProd } from 'app/state/actions/currentProd.actions';
import { ConfirmDialogData } from '@models/confirm-dialog-data.models';
import { ConfirmDialogComponent } from '@modules/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category?: Category;

  constructor(private store: Store<any>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.select(getCurrentProd).subscribe((data) => {
      if (data.category) {
        this.category = data.category;
      }
    });
  }

  seachCategory() {
    const dialogRef = this.dialog.open(CategorySearchComponent, {
      minHeight: '610px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed!!!', result);

      if (result) {
        const data: ConfirmDialogData = {
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
              updateCurrentProd({
                property: { category: result },
              })
            );
            this.store.dispatch(
              updateCurrentProd({
                property: { category_id: result.id },
              })
            );
          }
        });
      }
    });
  }
}
