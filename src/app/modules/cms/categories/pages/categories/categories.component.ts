import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICategory } from '@models/index';
import { CategoriesService } from 'app/services/categories.service';
import { MessageService } from 'app/services/message.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { IConfirmDialogData } from '@models/index';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ModalNewCategoryComponent } from '../../components/modal-new-category/modal-new-category.component';
import { ModalEditCategoryComponent } from '../../components/modal-edit-category/modal-edit-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'full_name',
    'description_web',
    'actions',
  ];
  dataSource = new MatTableDataSource<ICategory>();
  loading = false;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.loading = true;
    this.categoriesService.getCategories().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<ICategory>(data); //pass the array you want in the table
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
      return data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCat(category: ICategory) {
    const data: IConfirmDialogData = {
      title: '¿Estas seguro?',
      message: `¿Deseas eliminar la categoría ${category.id} - ${category.name}?`,
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
        this.categoriesService.deleteCategory(category.id).subscribe({
          next: () => {
            const index = this.dataSource.data.findIndex(
              (cat) => cat.id === category.id
            );
            if (index !== -1) {
              this.dataSource.data.splice(index, 1);
              this.dataSource.data = this.dataSource.data;
              this.message.showMsg('Categoría eliminada', 'success');
            }
          },
          error: (error: HttpErrorResponse) => {
            if (
              error.status === HttpStatusCode.InternalServerError &&
              error.error.message ===
                'null value in column "category_id" of relation "products" violates not-null constraint'
            ) {
              this.message.showMsg(
                'La categoría posee productos instanciados',
                'error'
              );
            } else {
              this.message.showMsg('Error eliminado la categría', 'error');
            }
          },
        });
      }
    });
  }

  editCat(category: ICategory) {
    const dialogRef = this.dialog.open(ModalEditCategoryComponent, {
      minHeight: '250px',
      width: '500px',
      data: category,
    });

    dialogRef.afterClosed().subscribe((category) => {
      if (category) {
        const index = this.dataSource.data.findIndex(
          (cat) => cat.id === category.id
        );
        if (index !== -1) this.dataSource.data.splice(index, 1);
        this.dataSource.data.unshift(category);
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  createCategory() {
    const dialogRef = this.dialog.open(ModalNewCategoryComponent, {
      minHeight: '500px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dataSource.data.unshift(result);
      this.dataSource.data = this.dataSource.data;
    });
  }
}
