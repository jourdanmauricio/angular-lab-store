import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '@models/category.model';
import { CategoriesService } from 'app/services/categories.service';
import { MessageService } from 'app/services/message.service';
import { ModalNewCategoryComponent } from '../modal-new-category/modal-new-category.component';

@Component({
  selector: 'app-modal-edit-category',
  templateUrl: './modal-edit-category.component.html',
  styleUrls: ['./modal-edit-category.component.scss'],
})
export class ModalEditCategoryComponent implements OnInit {
  category!: Category;
  description_web = new FormControl(this.data.description_web);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Category,
    public dialogRef: MatDialogRef<ModalNewCategoryComponent>,
    private categoriesService: CategoriesService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.category = this.data;
  }

  updateCategory() {
    this.category.description_web = this.description_web.value;

    this.categoriesService.updateCategory(this.category).subscribe({
      next: (cat) => {
        this.message.showMsg(`Categoría ${cat.id} modificada`, 'success');
        this.dialogRef.close(cat);
      },
      error: () =>
        this.message.showMsg('Error modificando la categoría', 'error'),
    });
  }
}
