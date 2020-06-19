import {Component, OnInit, AfterViewInit } from '@angular/core';

import { Router  } from '@angular/router';

import {ConfirmationService} from 'primeng/api'

import { ListUsersService } from '../../../services/auth/listusers/listusers.service';

import {DeleteUserService} from 'src/app/services/auth/deleteuser/deleteuser.service';
import {DeleteUserRequest} from 'src/app/services/auth/deleteuser/deleteuser.request'

import { User } from 'src/app/models/user';

@Component({
    templateUrl: './userslist.component.html',
    providers:[ListUsersService, ConfirmationService, DeleteUserService]
})
export class UsersListComponent implements OnInit  {

    cols: any[];

    users: User[];


    constructor(private listUsersService: ListUsersService, 
                private router:Router,
                private confirmationService: ConfirmationService,
                private deleteUserService: DeleteUserService
                ) { }

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Usuario' },
            { field: 'status', header: 'Estado' }
        ];
 
        setTimeout(()=> {
            this.listUsersService.execute({}).subscribe(
                data => {
                    this.users = data.users;
                }
            )
        })
 
    }

    onDelete(username:string){
        console.log('username to delete:' + username);
        this.confirmationService.confirm({
            message: 'Esta seguro que desea eliminar el usuario ' + username + ' ?',
            accept: () => {
                //Actual logic to perform a confirmation
                console.log('Se confirma la eliminacion de:' + username)
                this.deleteUserService.execute(
                    {
                        'username' : username 
                    } as DeleteUserRequest
                ).subscribe(
                    value => {
                        if (this.deleteUserService.hasErrors(value)){
                            this.listUsersService.execute({}).subscribe(
                                data => {
                                    this.users = data.users;
                                    this.router.navigate(['/#/users/list'])
                                }
                            )
                        }
                    }
                )
            }
        });
    }

}
