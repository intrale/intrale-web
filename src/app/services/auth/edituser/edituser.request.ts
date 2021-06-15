import { Request } from '../../../models/request'

export interface EditUserRequest extends Request {
    email:string;
    groups:string[];
}