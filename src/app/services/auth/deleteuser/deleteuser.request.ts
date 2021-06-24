import { Request } from '../../../models/request'

export interface DeleteUserRequest extends Request {
    email:string;
}