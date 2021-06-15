import {Error} from 'src/app/models/error'

export class ServiceError {

    private statusCode: number;

    private errors: Error[] = [];

    public setStausCode(statusCode:number){
        this.statusCode = statusCode;
    }

    public getStatusCode(){
        return this.statusCode;
    }

    public setErrors(errors: Error[]){
        this.errors = errors;
    }

    public find(errorCode: String): boolean{
        if (this.errors){
            console.log(this.errors);
            let size = this.errors.length;
            let index = 0;
            while(index<size){
                if (this.errors[index].code == errorCode){
                    return true;
                }
                index = index + 1;
            }
        }
        return false;
    }

    public addError(code:String, description:String){
        this.errors.push({
            code: code,
            description: description
        } as Error)
    }

    public has400FamilyErrors():boolean{
        return (this.statusCode>=400 && this.statusCode<500);
    }

    public has500FamilyErrors():boolean{
        return (this.statusCode>=500 && this.statusCode<600);
    }

    public hasUnexpectedError(){
        return (!this.has400FamilyErrors() && !this.has500FamilyErrors());
    }

    public getErrorsCodes(): string[]{
        let errors:string[] = [];
        
        if (this.errors){
            let size = this.errors.length;
            let index = 0;
            while(index<size){
                errors.push(this.errors[index].description);
                index = index + 1;
            }
        }

        return errors;
    }

    public hasUnAuthorizedError(){
        return (this.statusCode == 401);
    }

    public getError() : Error{
        return this.errors[0];
    }
}