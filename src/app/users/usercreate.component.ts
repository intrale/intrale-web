import {Component, OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, Form, AbstractControl} from '@angular/forms';

@Component({
    templateUrl: './usercreate.component.html'
})
export class UserCreateComponent implements OnInit {

    userform: FormGroup;

    constructor(private fb: FormBuilder){}
    
    ngOnInit() {
        
        this.userform = this.fb.group({
            firstnameExample: new FormControl('',  Validators.required),
            firstname: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            rewritedEmail: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            rewritedPassword: new FormControl('', Validators.required)

        });
 
    }

}
