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
            username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9_-]{8,15}$')]),
            firstname: new FormControl('', null /*Validators.required*/),
            surname: new FormControl('', null /*Validators.required*/)
        });

        this.activatedRoute.paramMap.subscribe(params => {
            setTimeout(()=> {
                this.getUserService.execute(
                    {
                        'username' : params.get('username') 
                    } as GetUserRequest
                ).subscribe(
                    value => {
                        this.targetGroups = value.groups;
                        // filtrar el source con este resultado

                        this.userform.setValue({ 
                            'firstname': value.name,
                            'surname': value.familyName,
                            'username' : value.username 
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
                username: this.userform.get('username').value,
                groups: groups                
            } as EditUserRequest)
            .subscribe(
                value=> { 
                    if(!this.editUserService.hasErrors(value)){
                        this.router.navigate(['/users/list']);
                    }
                }, 
                error => { },
                () => {
                    
                });

    }

}
