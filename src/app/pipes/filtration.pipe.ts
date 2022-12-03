import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtration',
  pure: false,
})
export class FiltrationPipe implements PipeTransform {
  transform(array: any, ...args: any[]): any {
    // country
    var newArray = array.filter(function (value: any) {
      return args[0][0].includes(value.country);
    });
    // stars
    var temp = 0;
    var newArray2 = newArray.filter(function (value: any) {
      if (value.amountVote == 0) {
        temp = 0;
      } else {
        temp = value.amountPoints / value.amountVote;
      }
      for (let i = 0; i < args[0][1].length; i++) {
        if (temp >= args[0][1][i] && temp < args[0][1][i] + 1) {
          return true;
        }
      }
      return false;
    });
    // date
    var wStart = new Date(args[0][2]);
    var wEnd = new Date(args[0][3]);
    var start;
    var end;
    var newArray3 = newArray2.filter(function (value: any) {
      start = new Date(value.startDate);
      end = new Date(value.endDate);
      return start >= wStart && end <= wEnd;
    });

    // price
    var newArray4 = newArray3.filter(function (value: any) {
      return value.price >= args[0][4] && args[0][5] >= value.price;
    });

    // return newArray4;
    return newArray4;
  }
}
