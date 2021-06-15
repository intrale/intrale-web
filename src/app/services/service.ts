import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { share, catchError } from 'rxjs/operators';

import { Router } from '@angular/router';

import { Response } from '../models/response';
import { Request } from '../models/request';
import { MessageService } from 'primeng/primeng';
import { AppState } from '../config/appstate';
import { Error } from '../models/error';
import { ServiceError } from './serviceError';

import { v4 as uuidv4 } from 'uuid';

export abstract class Service <REQ extends Request, RES extends Response> {

    constructor(protected httpClient: HttpClient, 
                protected messageService: MessageService,
                protected router:Router,
                protected appState:AppState){
    }

    protected abstract getEndpoint():string;
    protected abstract getFunction():string;

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

        request.requestId = uuidv4();
        request.businessName = 'INTRALE';
        
        this.appState.addExecute();

        let res: Observable<RES> = this.httpClient
            .post<RES>(this.getEndpoint(), request, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'idtoken': 'Bearer ' + localStorage.getItem('idtoken'),
                    'function': this.getFunction(),
                    'businessname': 'INTRALE'
                }
            })
            .pipe(share())
            .pipe(catchError(this.handleError));

        console.log('Post executed to:' + this.getEndpoint())

        res.subscribe(
            value=> {
                console.log('End call service:' + this.getEndpoint());
                console.log('subscribe sucess');
                        // success execution
                        this.appState.removeExecute();
                    }, 
            error => {
                        console.log('End call service:' + this.getEndpoint());
                        console.log("message:" +JSON.stringify(error));
                        
                        // execution with error
                        this.appState.removeExecute();
                        let serviceError:ServiceError = error;
                        console.log('1');
                        if (serviceError.hasUnAuthorizedError()){
                            let error: Error = serviceError.getError();
                            this.messageService.add({
                                key: 'generalMessages',
                                severity: 'error',
                                summary: error.code,
                                detail: error.description,
                                closable: false });
                            localStorage.removeItem('username');
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            this.router.navigate(['/']);
                        }
                        console.log('2');
                        if (serviceError.hasUnexpectedError()){
                            let errorCodes: string[]=serviceError.getErrorsCodes();
                            let size = errorCodes.length;
                            let index = 0;
                            while(index<size){
                                this.messageService.add({
                                    key: 'generalMessages',
                                    severity: 'error',
                                    summary: serviceError.getStatusCode().toString(),
                                    detail: errorCodes[index],
                                    closable: false
                                })
                                index = index + 1;
                            }
                            console.log('Ocurrio un error' );
                        }
                       console.log('Finalizing general errors attend');
                    })
        return res;
    }


    private handleError(error: HttpErrorResponse) {
        let serviceError:ServiceError = new ServiceError();

        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          serviceError.setStausCode(-1);
          serviceError.addError('ClientSideError', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          serviceError.setStausCode(error.status);
          serviceError.setErrors(error.error.errors);
        }
        // return an observable with a user-facing error message
        return throwError(serviceError);
      };

}