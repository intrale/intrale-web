import { Request } from '../../../models/request'

export interface DeleteUserRequest extends Request {
    username:string;
}