import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IOptionsCat } from '@models/index';
import { CategoriesService } from 'app/services/categories.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-modal-new-category',
  templateUrl: './modal-new-category.component.html',
  styleUrls: ['./modal-new-category.component.scss'],
})
export class ModalNewCategoryComponent implements OnInit {
  optionsCategories: IOptionsCat[] = [];
  catSelect: string = '';

  constructor(
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<ModalNewCategoryComponent>,
    private message: MessageService
  ) {}

  ngOnInit(): void {}

  searchPredictor(description: string) {
    const search = description.trim();
    if (search.length === 0) {
      return;
    }

    this.categoriesService
      .getCategoriesPredictor(search)
      .subscribe((categories: any) => {
        this.optionsCategories = [];
        categories.map((cat: any) => {
          let full_name = '';
          cat.path_from_root.forEach((parent: any, index: number) => {
            full_name += index === 0 ? parent.name : ` / ${parent.name}`;
          });
          this.optionsCategories.push({ id: cat.id, name: full_name });
        });
      });
  }
  selectCat(value: string) {
    this.catSelect = value;
  }
  createCategory() {
    this.categoriesService.getAndCreateCategory(this.catSelect).subscribe({
      next: (cat) => {
        this.message.showMsg(`Categoría ${cat.id} creada`, 'success');
        this.dialogRef.close(cat);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          this.message.showMsg('La categoría ya existe', 'error');
          return;
        }
        this.message.showMsg('Error creando la categoría', 'error');
      },
    });
  }
}
