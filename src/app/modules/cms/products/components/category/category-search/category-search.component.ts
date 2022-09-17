import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '@models/index';
import { CategoriesService } from 'app/services/categories.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss'],
})
export class CategorySearchComponent implements OnInit {
  category?: ICategory | null;

  constructor(
    public dialogRef: MatDialogRef<CategorySearchComponent>,
    public categoriesService: CategoriesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  selCategory(id: string) {
    this.categoriesService.getCategory(id).subscribe({
      next: (cat) => {
        this.category = cat;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          this.categoriesService.getAndCreateCategory(id).subscribe((cat) => {
            this.category = cat;
          });
        } else {
          this.messageService.showMsg('Error obteniendo la categoría', 'error');
        }
      },
    });
  }

  selectCategory() {
    this.dialogRef.close(this.category);
  }
}
