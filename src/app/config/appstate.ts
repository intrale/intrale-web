import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class AppState {

    public executingCount:number;

    constructor(){
        this.executingCount = 0;
    }

    public addExecute(){
        this.executingCount = this.executingCount + 1;
    }

    public removeExecute(){
        var promise = new Promise((resolve, reject) => {
            this.executingCount = this.executingCount - 1;
        });
    }

    public isExecuting():boolean {
        return (this.executingCount>0);
    }

}