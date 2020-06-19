import { Request } from '../../../models/request'

export interface SignInRequest extends Request {
	name:string,
	familyName:string;
    username: string;
	password: string;
	newPassword: string;
}