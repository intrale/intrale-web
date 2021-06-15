import {Component, OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, Form, AbstractControl} from '@angular/forms';

import { MessageService } from 'primeng/primeng';  

import { SignUpService } from '../../../services/auth/signup/signup.service'
import { SignUpRequest } from '../../../services/auth/signup/signup.request';
import { ServiceError } from 'src/app/services/serviceError'

import { Router } from '@angular/router';

@Component({
    templateUrl: './registration.component.html',
    providers: [SignUpService]

})
export class RegistrationComponent implements OnInit {

    userform: FormGroup;
    executed: boolean = false;
 
    constructor( 
        private fb: FormBuilder, 
        private signupService:SignUpService, 
        private router:Router,
        protected messageService: MessageService
        ){}
    
    ngOnInit() {
        
        this.userform = this.fb.group({
            /*username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9_-]{8,15}$')]),
            firstname: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),*/
            email: new FormControl('', [Validators.required, Validators.email]),
            /*rewritedEmail: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&=])(?=\\S+$).{8,}$')]),
            rewritedPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&=])(?=\\S+$).{8,}$')])
            */
        });
 
    }

    isSignUpAvaiable(){
        return this.userform.valid && !this.executed
    }

    onRegister(){
        console.log('Enviando formulario');
        this.executed = true;
        this.signupService.execute(
            {
                /*name: this.userform.get('firstname').value,
                familyName: this.userform.get('surname').value,
                username: this.userform.get('username').value,
                password: this.userform.get('password').value,*/
                email: this.userform.get('email').value
            } as SignUpRequest)
            .subscribe(
                value=> { 
                    this.messageService.add({
                        key: 'generalMessages',
                        severity: 'warn',
                        summary: 'Usuario creado',
                        detail: 'La generacion del usuario ' + this.userform.get('username').value + ' finalizó con exito.',
                        closable: false
                    })
                    this.router.navigate(['/']);
                    this.executed = false;
                }, 
                error => {
                    this.executed = false; 
                    let serviceError:ServiceError = error;
                    if (!serviceError.hasUnexpectedError()) {
                        this.messageService.add({
                            key: 'generalMessages',
                            severity: 'error',
                            summary: serviceError.getError().description,
                            detail: serviceError.getError().description,
                            closable: false
                        });
                    }
                }
            );

    }

}
