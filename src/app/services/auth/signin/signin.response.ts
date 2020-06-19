import { Response } from '../../../models/response'

export interface SignInResponse extends Response {

    idToken: string;
	accessToken: string;
	refreshToken: string;
    
}