import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';

import { SaveProductResponse } from './saveProduct.response';
import { SaveProductRequest } from './saveProduct.request';

import Endpoints from 'src/app/config/endpoints.json'
import { Service } from 'src/app/services/service';
import { AppState } from 'src/app/config/appstate';


@Injectable()
export class SaveProductService extends Service<SaveProductRequest, SaveProductResponse>{
    
    constructor(protected httpClient: HttpClient, 
        protected messageService: MessageService, 
        protected router:Router,
        protected appState:AppState){
        super(httpClient, messageService, router, appState);
    }

    protected getEndpoint(): string {
        return Endpoints.product;
    }
    
    
    protected getFunction(): string {
        return 'save';
    }
}