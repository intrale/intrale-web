import { Response } from '../../../models/response'

export interface SignUpResponse extends Response {

    username: string;
	userStatus: string;
	enabled: boolean;
    
}