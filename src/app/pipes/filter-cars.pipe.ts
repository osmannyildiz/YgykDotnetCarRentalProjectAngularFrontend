import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'filterCars',
})
export class FilterCarsPipe implements PipeTransform {
  transform(value: CarDetail[], filterText: string): CarDetail[] {
    if (filterText && filterText.length >= 2) {
      filterText = filterText.toLocaleLowerCase();
      return value.filter(
        (cd: CarDetail) => cd.carName.toLocaleLowerCase().indexOf(filterText) !== -1
      );
    }
    return value;
  }
}
