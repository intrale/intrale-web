import { Request } from '../../../models/request'

export interface SignUpRequest extends Request {
	email: string;
}