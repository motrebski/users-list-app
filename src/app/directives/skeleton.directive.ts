import { Directive, ElementRef, Renderer2, Input, OnChanges } from '@angular/core';

// Directive for creating customized skeleton
@Directive({
  selector: '[skeleton]'
})
export class SkeletonDirective implements OnChanges {

  // Default values for skeleton
  @Input('skeletonWidth') width = '100%';
  @Input('skeletonHeight') height = '1rem';
  @Input('skeletonRounding') rounding = '0.5rem';
  @Input('skeletonCustomClass') customClass = '';

  cssClass = 'skeleton';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(): void {
    // Customized skeleton set up
    const el = this.element.nativeElement;
    this.renderer.setStyle(el, 'width', this.width);
    this.renderer.setStyle(el, 'height', this.height);
    this.renderer.setStyle(el, 'border-radius', this.rounding);
    this.renderer.addClass(el, this.cssClass);
    if (this.customClass) {
      this.renderer.addClass(el, this.customClass);
    }
  }
}