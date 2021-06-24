import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';

import { DeleteUserResponse } from './deleteuser.response';
import { DeleteUserRequest } from './deleteuser.request';

import Endpoints from '../../../config/endpoints.json'
import { Service } from '../../service';
import { AppState } from 'src/app/config/appstate';


@Injectable()
export class DeleteUserService extends Service<DeleteUserRequest, DeleteUserResponse>{
    protected getFunction(): string {
        return "delete";
    }
    
    constructor(protected httpClient: HttpClient, 
                protected messageService: MessageService, 
                protected router:Router,
                protected appState:AppState){
        super(httpClient, messageService, router, appState);
    }

    protected getEndpoint(): string {
        return Endpoints.users;
    }
    
}