import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';

import { DeleteProductResponse } from './deleteproduct.response';
import { DeleteProductRequest } from './deleteproduct.request';

import Endpoints from 'src/app/config/endpoints.json'
import { Service } from 'src/app/services/service';
import { AppState } from 'src/app/config/appstate';


@Injectable()
export class DeleteProductService extends Service<DeleteProductRequest, DeleteProductResponse>{
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
        return Endpoints.product;
    }
    
}