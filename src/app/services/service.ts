import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { Router } from '@angular/router';

import { Response } from '../models/response';
import { Request } from '../models/request';
import { MessageService } from 'primeng/primeng';
import { AppState } from '../config/appstate';

export abstract class Service <REQ extends Request, RES extends Response> {

    constructor(protected httpClient: HttpClient, 
                protected messageService: MessageService,
                protected router:Router,
                protected appState:AppState){
    }

    protected abstract getEndpoint():string;


    public hasErrors(response: RES): boolean {
        return (response.errors && response.errors.length>0);
    }

    public hasError(response: RES, code: string): boolean {
        let err: boolean;
        err = false;
        if (response.errors) {
            response.errors.forEach((error)=>{
                if (code == error.code){
                    err = true;
                }
            })
        }
        return err;
    }

    public execute (request: REQ): Observable<RES> {
        console.log('Start call service:' + this.getEndpoint())

        this.appState.addExecute();

        let res: Observable<RES> = this.httpClient
            .post<RES>(this.getEndpoint(), request, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            .pipe(share());

        console.log('Post executed to:' + this.getEndpoint())

        res.subscribe(
            value=> {
                        // success execution
                        
                        if (this.hasErrors(value)){
                            if (this.hasError(value, 'TOKEN_EXPIRED')){
                                this.messageService.add({
                                    key: 'generalMessages',
                                    severity: 'error',
                                    summary: 'Token Expired',
                                    detail: 'Su token a expirado, necesita autenticarse nuevamente.',
                                    closable: false });
                                localStorage.removeItem('username');
                                localStorage.removeItem('accessToken');
                                localStorage.removeItem('refreshToken');
                                this.router.navigate(['/']);
                            } else {
                                value.errors.forEach((error)=>{
                                    this.messageService.add({
                                        key: 'generalMessages',
                                        severity: 'warn',
                                        summary: error.code,
                                        detail: error.description,
                                        closable: false
                                    })
                                })
                            }
                        }
                    }, 
            error => {
                        // execution with error
                       console.log('Ocurrio un error');
                       this.messageService.add({
                        key: 'generalMessages',
                        severity: 'error',
                        summary: error,
                        detail: error,
                        closable: false
                    })
                    },
            () => {
                // always on return with or without errors
                console.log('End call service:' + this.getEndpoint());

                this.appState.removeExecute();
            })
        return res;
    }

}