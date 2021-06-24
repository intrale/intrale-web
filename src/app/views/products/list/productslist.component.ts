import {Component, OnInit, AfterViewInit } from '@angular/core';

import { Router  } from '@angular/router';

import {ConfirmationService} from 'primeng/api'

import { ListUsersService } from '../../../services/auth/listusers/listusers.service';

import {DeleteUserService} from 'src/app/services/auth/deleteuser/deleteuser.service';
import {DeleteUserRequest} from 'src/app/services/auth/deleteuser/deleteuser.request'

import { User } from 'src/app/models/user';
import { ListUsersRequest } from 'src/app/services/auth/listusers/listusers.request';

@Component({
    templateUrl: './productslist.component.html',
    providers:[ListUsersService, ConfirmationService, DeleteUserService]
})
export class ProductsListComponent implements OnInit  {

    cols: any[];

    users: User[];


    constructor(private listUsersService: ListUsersService, 
                private router:Router,
                private confirmationService: ConfirmationService,
                private deleteUserService: DeleteUserService
                ) { }

    ngOnInit() {
        this.cols = [
            { field: 'email', header: 'Email' },
            { field: 'name', header: 'Nombre' },
            { field: 'familyName', header: 'Apellido' },
            { field: 'status', header: 'Estado' }
        ];
 
        setTimeout(()=> {
            this.listUsersService.execute({} as ListUsersRequest).subscribe(
                data => {
                    this.users = data.users;
                }
            )
        })
 
    }

    onDelete(email:string){
        console.log('username to delete:' + email);
        this.confirmationService.confirm({
            message: 'Esta seguro que desea eliminar el usuario ' + email + ' ?',
            accept: () => {
                //Actual logic to perform a confirmation
                console.log('Se confirma la eliminacion de:' + email)
                this.deleteUserService.execute(
                    {
                        'email' : email 
                    } as DeleteUserRequest
                ).subscribe(
                    value => {
                        if (!this.deleteUserService.hasErrors(value)){
                            this.listUsersService.execute({} as ListUsersRequest).subscribe(
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
