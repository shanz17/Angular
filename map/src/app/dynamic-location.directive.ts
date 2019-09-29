import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[preferred-location]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}