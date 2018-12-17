import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({ selector: '[appBackgroundChange]'})
export class BackgroundChangeDirective {
    // tslint:disable-next-line:no-input-rename
    @Input() color: string;
    constructor(private el: ElementRef, private renderer: Renderer) {
    }
    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.color || 'red');
      }
      @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
      }
      private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
      }
}
