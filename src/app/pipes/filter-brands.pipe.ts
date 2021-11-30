import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'filterBrands',
})
export class FilterBrandsPipe implements PipeTransform {
  transform(value: Brand[], filterText: string): Brand[] {
    if (filterText && filterText.length >= 2) {
      filterText = filterText.toLocaleLowerCase();
      return value.filter(
        (b: Brand) => b.name.toLocaleLowerCase().indexOf(filterText) !== -1
      );
    }
    return value;
  }
}
