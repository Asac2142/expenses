import { ElementRef } from '@angular/core';
import { NumberFormatDirective } from './number-format.directive';

describe('NumberFormatDirective', () => {
  it('should create an instance', () => {
    const mockInputElement = new HTMLInputElement();
    const mockElementRef: ElementRef<any> = new ElementRef(mockInputElement)
    const directive = new NumberFormatDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
