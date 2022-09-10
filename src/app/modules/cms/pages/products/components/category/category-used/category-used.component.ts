import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, of, startWith, switchMap } from 'rxjs';
import { Category } from '@models/index';
import { CategoriesService } from 'app/services/categories.service';

@Component({
  selector: 'app-category-used',
  templateUrl: './category-used.component.html',
  styleUrls: ['./category-used.component.scss'],
})
export class CategoryUsedComponent implements OnInit {
  @Output() onCatSelect = new EventEmitter();
  search = new FormControl();
  categories: Category[] = [];
  selected = '';

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = res;
      this.search.setValue(null);
    });
  }

  selectCat(category: Category) {
    this.onCatSelect.emit(category.id);
  }

  $search = this.search.valueChanges.pipe(
    startWith(null),
    debounceTime(200),
    switchMap((res: string) => {
      if (!res) return of(this.categories);
      res = res.toLowerCase();
      return of(
        this.categories.filter((cat) => {
          return cat.full_name.toLowerCase().includes(this.search.value);
        })
      );
    })
  );
}
