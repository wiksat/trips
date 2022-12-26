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
    // return newArray4;

    // status
    var newArray5 = newArray4.filter(function (value: any) {
      if (
        args[0][6].includes(0) &&
        args[0][6].includes(1) &&
        args[0][6].includes(2)
      ) {
        return value;
      }
      var data = value.startDate;
      data = data.split('-');
      var newStartDate = new Date(data[0] + '/' + data[1] + '/' + data[2]);
      data = value.endDate;
      data = data.split('-');
      var newEndDate = new Date(data[0] + '/' + data[1] + '/' + data[2]);
      var currentDate = new Date();
      if (args[0][6].includes(0)) {
        if (newStartDate > currentDate) {
          return value;
        }
      }
      if (args[0][6].includes(1)) {
        if (newStartDate < currentDate && currentDate < newEndDate) {
          return value;
        }
      }
      if (args[0][6].includes(2)) {
        if (currentDate > newEndDate) {
          return value;
        }
      }
    });

    return newArray5;
  }
}
