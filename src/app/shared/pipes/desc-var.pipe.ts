import { Pipe, PipeTransform } from '@angular/core';
import { IAttributeCombination } from '@models/index';

@Pipe({
  name: 'descVar',
})
export class DescVarPipe implements PipeTransform {
  transform(
    attrComb: IAttributeCombination[],
    feature: 'title' | 'value'
  ): string {
    let text = '';

    const value = (attr: IAttributeCombination) => {
      return feature === 'title' ? attr.name : attr.value_name;
    };

    attrComb.forEach((attr, index) => {
      text = index === 0 ? value(attr) : text + '/' + value(attr);
    });

    return text;
  }
}
