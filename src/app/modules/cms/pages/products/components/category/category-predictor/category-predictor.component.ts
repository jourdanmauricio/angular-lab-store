import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '@models/category.model';
import { optionsCat } from '@modules/cms/components/categories/modal-new-category/modal-new-category.component';
import { CategoriesService } from 'app/services/categories.service';

@Component({
  selector: 'app-category-predictor',
  templateUrl: './category-predictor.component.html',
  styleUrls: ['./category-predictor.component.scss'],
})
export class CategoryPredictorComponent implements OnInit {
  @Output() onCatSelect = new EventEmitter();

  optionsCategories: optionsCat[] = [];
  catSelect: string = '';
  categories = [];
  category?: Category;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {}

  predictor(value: string) {
    if (value.trim().length === 0) {
      this.categories = [];
      return;
    }
    this.categoriesService
      .getCategoriesPredictor(value)
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
    this.onCatSelect.emit(value);
  }
}
