import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';

import { GetUserResponse } from './getuser.response';
import { GetUserRequest } from './getuser.request';

import Endpoints from '../../../config/endpoints.json'
import { Service } from '../../service';
import { AppState } from 'src/app/config/appstate';


@Injectable()
export class GetUserService extends Service<GetUserRequest, GetUserResponse>{
    
    constructor(protected httpClient: HttpClient, 
        protected messageService: MessageService, 
        protected router:Router,
        protected appState:AppState){
        super(httpClient, messageService, router, appState);
    }

    protected getEndpoint(): string {
        return Endpoints.auth.getuser;
    }
    
}