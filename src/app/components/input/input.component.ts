import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms'
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
    this.errorsMessages = ''
    let errors = this.formGroup.get(this.id).errors;
    if (errors){
      this.hasErrors = true;
      this.errorsMessages = Object.keys(errors)[0];
      console.log('onChange:' +  event.target + ':' + Object.keys(errors)[0])
    }
    this.change.emit(event)
  }

}
