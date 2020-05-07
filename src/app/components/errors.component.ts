import {Component, Input, ContentChild, OnInit} from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
    selector:'app-errors',
    templateUrl: './errors.component.html'
})
export class ErrorsComponent implements OnInit{

    @Input()  formGroup: FormGroup; ;
 
    constructor () {
        console.log('control.errors:' +  this.formGroup)
    }

    ngOnInit(): void {
        console.log('Objeto formGroup:' + this.formGroup)

    }
}