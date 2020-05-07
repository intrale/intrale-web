import { Directive, ElementRef, HostListener, Renderer2, NgZone} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[errorTooltip]'
})
export class ErrorTooltipDirective {

    renderer: Renderer2
    control: NgControl
    el: ElementRef
 
    constructor (renderer: Renderer2, el: ElementRef, zone: NgZone, control: NgControl) {
       this.renderer = renderer
       this.control = control
       this.el = el
    }

    @HostListener('change', ['$event'])
    onChange(event): void {

        let errors: ValidationErrors = this.control.errors
        if (errors){    
            console.log('Element change:' + event + ", " + Object.keys(errors)[0])
        } else {
            console.log('no errors')
        }
    }
}