import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';

import { CreateProductResponse } from './createProduct.response';
import { CreateProductRequest } from './createProduct.request';

import Endpoints from '../../../config/endpoints.json'
import { Service } from '../../service';
import { AppState } from 'src/app/config/appstate';


@Injectable()
export class CreateProductService extends Service<CreateProductRequest, CreateProductResponse>{
    
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
        return 'create';
    }
}