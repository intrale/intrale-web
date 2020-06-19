import { Request } from '../../../models/request'

export interface EditUserRequest extends Request {
    username:string;
    groups:string[];
}