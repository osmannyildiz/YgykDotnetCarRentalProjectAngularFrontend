import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'filterColors',
})
export class FilterColorsPipe implements PipeTransform {
  transform(value: Color[], filterText: string): Color[] {
    if (filterText && filterText.length >= 2) {
      filterText = filterText.toLocaleLowerCase();
      return value.filter(
        (c: Color) => c.name.toLocaleLowerCase().indexOf(filterText) !== -1
      );
    }
    return value;
  }
}
