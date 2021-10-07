import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movie'
})
export class MoviePipe implements PipeTransform {

  transform(value: number): unknown {
    let string = ""
    string = value > 2000? "NEW":"OLD"
    return string;
  }
}
