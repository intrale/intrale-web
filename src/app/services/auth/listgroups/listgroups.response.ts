import { Response } from '../../../models/response'
import { Group } from '../../../models/group';

export interface ListGroupsResponse extends Response {

    groups: Group [];
    
}