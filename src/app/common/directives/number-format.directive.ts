import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgxMaskPipe } from 'ngx-mask';

@Directive({
  selector: '[numberFormat]',
  standalone: true
})
export class NumberFormatDirective {
  private _maskPipe = inject(NgxMaskPipe);
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event.target.value']) input(data: string) {
    const formatted = this._maskPipe.transform(data, '0*.00');
    this.elementRef.nativeElement.value = formatted;
  }
}
