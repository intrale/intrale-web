import { Request } from '../../../models/request'

export interface EditUserRequest extends Request {
    email:string;
    name:string;
    familyName:string;
    groups:string[];
}