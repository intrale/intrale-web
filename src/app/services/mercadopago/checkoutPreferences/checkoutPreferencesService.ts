import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';

import Endpoints from '../../../config/mercadopago.json'
import { AppState } from 'src/app/config/appstate';
import { MercadoPagoService } from '../mercadoPagoService';
import { CheckoutPreferencesRequest } from './checkoutPreferencesRequest';
import { CheckoutPreferencesResponse } from './checkoutPreferencesResponse';


@Injectable()
export class CheckoutPreferencesService extends MercadoPagoService<CheckoutPreferencesRequest, CheckoutPreferencesResponse>{
    
    constructor(protected httpClient: HttpClient, 
        protected messageService: MessageService, 
        protected router:Router,
        protected appState:AppState){
        super(httpClient, messageService, router, appState);
    }

    protected getEndpoint(): string {
        return Endpoints.checkoutPreferences;
    }
    
}