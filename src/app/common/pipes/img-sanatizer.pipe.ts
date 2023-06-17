import { Pipe, PipeTransform, SecurityContext, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imgSanatizer',
  standalone: true
})
export class ImgSanatizerPipe implements PipeTransform {
  private _domSanitizer = inject(DomSanitizer);
  private securityContext: SecurityContext = 4;

  transform(url: string): string | null {
    const cleanUrl = this._domSanitizer.sanitize(this.securityContext, url);
    return cleanUrl;
  }
}
