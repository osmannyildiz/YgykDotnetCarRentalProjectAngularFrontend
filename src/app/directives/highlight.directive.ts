import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.padding = "0.1rem 0.25rem";
    el.nativeElement.style.borderRadius = "0.25rem";
    let i = setInterval(() => {
      if (el.nativeElement.style.backgroundColor === "yellow") {
        el.nativeElement.style.backgroundColor = null;
      } else {
        el.nativeElement.style.backgroundColor = "yellow";
      }
    }, 1000);
  }
}

// https://angular.io/guide/attribute-directives
