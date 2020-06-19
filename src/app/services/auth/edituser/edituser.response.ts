import { Response } from '../../../models/response'
import { User } from 'src/app/models/user';

export interface EditUserResponse extends Response {

    users: User[];
    
}