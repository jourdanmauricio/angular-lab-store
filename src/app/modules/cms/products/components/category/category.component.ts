import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Category } from '@models/index';
// import { getCurrentProd } from 'app/state/selectors/currentProd.selector';
import { MatDialog } from '@angular/material/dialog';
import { CategorySearchComponent } from './category-search/category-search.component';
// import { updateCurrentProd } from 'app/state/actions/currentProd.actions';
import { ConfirmDialogData } from '@models/index';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category?: Category;

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    // this.store.select(getCurrentProd).subscribe((data) => {
    //   if (data.category) {
    //     this.category = data.category;
    //   }
    // });
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
            // this.store.dispatch(
            //   updateCurrentProd({
            //     property: { category: result },
            //   })
            // );
            // this.store.dispatch(
            //   updateCurrentProd({
            //     property: { category_id: result.id },
            //   })
            // );
          }
        });
      }
    });
  }
}
