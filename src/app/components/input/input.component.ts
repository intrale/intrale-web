import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms'
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() id: string;
  @Input() placeholder: string;
  @Input() formGroup: FormGroup;
  @Input() obfuscated: boolean = false;
  @Input() feedback: boolean = true;
 
  @Output('onChange') change: EventEmitter<any>;

  hasErrors: boolean;
  errorsMessages: string;

  constructor() {
    this.change = new EventEmitter();
  }

  ngOnInit() {
  }

  onChange(event:any){
    this.hasErrors = false;
    this.errorsMessages = '';
    if (this.formGroup) {
      let control: AbstractControl = this.formGroup.get(this.id);
      if (control){
        let errors = control.errors;
        if (errors){
          this.hasErrors = true;
          this.errorsMessages = Object.keys(errors)[0];
        }
        this.change.emit(event)
      }
    } else { console.log('No existe el formulario definido en:' + this.id) }
  }

}
 