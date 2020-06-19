import { Response } from '../../../models/response'
import { User } from 'src/app/models/user';

export interface ListUsersResponse extends Response {

    users: User[];
    
}