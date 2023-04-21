import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numberFormat]',
  standalone: true
})
export class NumberFormatDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event.target.value']) input(data: string) {
    const formatted = Number(Number(data).toFixed(2));
    this.elementRef.nativeElement.value = formatted;
  }
}
