import {Component, OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, Form, AbstractControl} from '@angular/forms';

import { MessageService } from 'primeng/primeng';  

import { ListGroupsService } from 'src/app/services/auth/listgroups/listgroups.service'
import { ListGroupsRequest } from 'src/app/services/auth/listgroups/listgroups.request';

import { GetUserService } from 'src/app/services/auth/getuser/getuser.service'
import { GetUserRequest } from 'src/app/services/auth/getuser/getuser.request';

import { EditUserService } from 'src/app/services/auth/edituser/edituser.service'
import { EditUserRequest } from 'src/app/services/auth/edituser/edituser.request';

import { ActivatedRoute, Router  } from '@angular/router';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';

@Component({
    templateUrl: './edituser.component.html',
    providers: [GetUserService, ListGroupsService, EditUserService]

})
export class EditUserComponent implements OnInit {

    userform: FormGroup;
    executed: boolean = false;
    sourceGroups: Group[];
    targetGroups: Group[];
 
    constructor( 
        private fb: FormBuilder, 
        private getUserService:GetUserService,
        private listGroupsService:ListGroupsService, 
        private editUserService:EditUserService, 
        private activatedRoute:ActivatedRoute ,
        private router:Router,
        protected messageService: MessageService
        ){}
    
    ngOnInit() {
        
        this.userform = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            name: new FormControl('', null /*Validators.required*/),
            familyName: new FormControl('', null /*Validators.required*/)
        });

        this.activatedRoute.paramMap.subscribe(params => {
            setTimeout(()=> {
                this.getUserService.execute(
                    {
                        'email' : params.get('email') 
                    } as GetUserRequest
                ).subscribe(
                    value => {
                        var user = value.users[0];
                        console.log('Retornando del GetUser');
                        console.log('value.name:' + user.name);
                        console.log('value.familyName:' + user.familyName);
                        console.log('value.email:' + user.email);
                        //this.targetGroups = value.groups;
                        // filtrar el source con este resultado

                        this.userform.setValue({ 
                            'name': user.name,
                            'familyName': user.familyName,
                            'email' : user.email 
                        });
                    }
                )
            });
        })

        setTimeout(()=> {
            this.listGroupsService.execute(
                {
                    
                } as ListGroupsRequest)
                .subscribe(
                    value=> { 
                        this.sourceGroups = value.groups;
                    }, 
                    error => { },
                    () => {
                        
                    });
            })


    }

    isSignUpAvaiable(){
        return this.userform.valid && !this.executed
    }

    onSubmit(){
        let groups:string[] = new Array();
        this.targetGroups.forEach((group: Group, index: number) => {
            console.log('iterando grupos:' + group.name);
            groups.push(group.name);
        })

        this.editUserService.execute(
            {
                email: this.userform.get('email').value,
                groups: groups                
            } as EditUserRequest)
            .subscribe(
                value=> { 
                    if(!this.editUserService.hasErrors(value)){



                        this.router.navigate(['/first-component']);



                        
                    }
                }, 
                error => { },
                () => {
                    
                });

    }

}
