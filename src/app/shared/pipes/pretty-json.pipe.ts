import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyJson',
})
export class PrettyJsonPipe implements PipeTransform {
  transform(val: any) {
    let newText = JSON.stringify(val, null, 2);
    newText = newText
      .replace('{', '')
      .replace('}', '')
      .replace(/,/g, '<br/>')
      .replace(/"/g, '');

    return '<small>' + newText + '</small>';
  }
}
