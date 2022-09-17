import { Pipe, PipeTransform } from '@angular/core';
import { TRADUCTION } from '@core/constants/traduction';

@Pipe({
  name: 'trad',
})
export class TradPipe implements PipeTransform {
  transform(value: string, feature: string): string {
    const trad = TRADUCTION.find(
      (traduccion) =>
        traduccion.text === value && traduccion.feature === feature
    );
    return trad ? trad.traduction : value;
  }
}
