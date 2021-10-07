import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: number): unknown {
    let age = 0
    var timeDiff = Math.abs(new Date().getFullYear() - value);
    return timeDiff;
  }

}
