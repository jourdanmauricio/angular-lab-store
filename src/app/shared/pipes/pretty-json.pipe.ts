import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyJson',
})
export class PrettyJsonPipe implements PipeTransform {
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(val: any) {
    let newText = JSON.stringify(val, null, 2);
    newText = newText
      .replace('{', '')
      .replace('}', '')
      .replace(',', '<br/>')
      .replace(/"/g, '');

    return '<small>' + newText + '</small>';
  }
}
