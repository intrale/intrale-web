import { Response } from '../../../models/response'
import { Group } from 'src/app/models/group';

export interface GetUserResponse extends Response {

    username: string,
    name: string,
    familyName: string,
    email: string,
    groups: Group[];
    
}