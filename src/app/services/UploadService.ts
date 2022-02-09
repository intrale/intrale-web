import { Service } from "./service";
import { Response } from '../models/response';
import { Observable } from "rxjs/internal/Observable";
import { UploadRequest } from "../models/uploadRequest";
import { HttpClient } from "@angular/common/http";
import { MessageService } from 'primeng/primeng';
import { Router } from "@angular/router";
import { AppState } from "../config/appstate";
import { Injectable } from "@angular/core";

@Injectable()
export class UploadService extends Service<UploadRequest, Response>{


    constructor(protected httpClient: HttpClient, 
        protected messageService: MessageService, 
        protected router:Router,
        protected appState:AppState){
        super(httpClient, messageService, router, appState);
    }
    
    protected getEndpoint(): string {
       return 'https://mgnr0htbvd.execute-api.us-east-2.amazonaws.com/dev/files/up';
    }
    protected getFunction(): string {
        return 'upload';
    }

    public buildPost(request: UploadRequest): Observable<Response> {
        let formData: FormData = new FormData();
        formData.append('', request.uploadedFiles[0]);
        

        return this.httpClient
            .post<Response>(this.getEndpoint(), formData, 
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'idtoken': 'Bearer ' + localStorage.getItem('idtoken'),
                    'function': this.getFunction(),
                    'businessname': 'INTRALE',
                    'filename':request.filename
                }
            });
    }

}