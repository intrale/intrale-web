import { Request } from '../../../models/request'

export interface SignUpRequest extends Request {
    username: string;
	email: string;
	password: string;
}