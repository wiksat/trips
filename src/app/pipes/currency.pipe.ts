import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, curr: string): any {
    if (curr == 'EUR') {
      return value.toString() + ' €';
    } else if (curr == 'PLN') {
      return value.toString() + ' zł';
    } else if (curr == 'USD') {
      return value.toString() + ' $';
    } else {
      return value.toString();
    }
  }
}
