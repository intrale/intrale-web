import { Response } from '../../../models/response'
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';

export interface GetUserResponse extends Response {

    users: User[];
    
}