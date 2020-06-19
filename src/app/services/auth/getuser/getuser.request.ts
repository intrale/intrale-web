import { Request } from '../../../models/request'

export interface GetUserRequest extends Request {

    username: string;

}