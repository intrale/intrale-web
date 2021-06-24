import * as _ from 'lodash'

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
import { group } from '@angular/animations';

@Component({
    templateUrl: './edituser.component.html',
    providers: [GetUserService, ListGroupsService, EditUserService]

})
export class EditUserComponent implements OnInit {

    userform: FormGroup;
    executed: boolean = false;
    sourceGroups: Group[] = [];
    targetGroups: Group[] = [];
 
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
                        this.targetGroups = user.groups;
                        if (!this.targetGroups){
                            this.targetGroups = [];
                        }
                        // filtrar el source con este resultado
                        this.listGroupsService.execute(
                            {
                                
                            } as ListGroupsRequest)
                            .subscribe(
                                value=> { 
                                    this.sourceGroups = 
                                    _.remove(value.groups, source => {
                                        return !_.find(this.targetGroups, target => {
                                            return target.name == source.name;
                                        });
                                    })
                                }, 
                                error => { },
                                () => {
                                    
                                });

                        this.userform.setValue({ 
                            'name': user.name,
                            'familyName': user.familyName,
                            'email' : user.email 
                        });
                    }
                )
            });
        })

    }

    isSignUpAvaiable(){
        return this.userform.valid && !this.executed
    }

    onSubmit(){
        let groups:string[] = new Array();
        this.targetGroups.forEach((group: Group, index: number) => {
            groups.push(group.name);
        })

        this.editUserService.execute(
            {
                email: this.userform.get('email').value,
                name: this.userform.get('name').value,
                familyName: this.userform.get('familyName').value,
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
