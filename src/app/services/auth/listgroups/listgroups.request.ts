import { Request } from '../../../models/request'

export interface ListGroupsRequest extends Request {
    username: string;
	password: string;
	newPassword: string;
}