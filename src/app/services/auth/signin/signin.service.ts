import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';

import { SignInResponse } from './signin.response';
import { SignInRequest } from './signin.request';

import Endpoints from '../../../config/endpoints.json'
import { Service } from '../../service';
import { AppState } from 'src/app/config/appstate';


@Injectable()
export class SignInService extends Service<SignInRequest, SignInResponse>{
    
    constructor(protected httpClient: HttpClient, 
        protected messageService: MessageService, 
        protected router:Router,
        protected appState:AppState){
        super(httpClient, messageService, router, appState);
    }

    protected getEndpoint(): string {
        return Endpoints.users;
    }
    
    
    protected getFunction(): string {
        return 'signin';
    }
}