import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '@models/index';

@Pipe({
  name: 'filterCategories',
})
export class FilterCategoriesPipe implements PipeTransform {
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(items: ICategory[], searchText: string): ICategory[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((code) => {
      return code.full_name.toLowerCase().includes(searchText);
    });
  }
}
