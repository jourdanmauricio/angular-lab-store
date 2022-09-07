import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
})
export class CategoryTreeComponent implements OnInit {
  @Output() onCatSelect = new EventEmitter();
  categories: Category[] = [];
  category!: Category;
  selected = false;
  full_path = '';

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategoriesPpalMl().subscribe((catsPpal) => {
      this.categories = catsPpal;
    });
  }

  selectCat(category: Category) {
    if (this.selected) return;
    this.category = category;
    this.full_path +=
      this.full_path.length === 0 ? category.name : ` / ${category.name}`;
    this.categoriesService.getCategoryMl(category.id).subscribe({
      next: (cat: any) => {
        if (cat.children_categories.length > 0) {
          this.categories = [];
          cat.children_categories?.map((child: any) =>
            this.categories.push(child)
          );
        } else {
          this.categories = [];
          this.categories.push(category);
          this.selected = true;
          this.onCatSelect.emit(category.id);
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          this.selected = true;
        }
      },
    });
  }
}
