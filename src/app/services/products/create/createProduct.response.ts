import { Response } from '../../../models/response'

export interface CreateProductResponse extends Response {

    idToken: string;
	accessToken: string;
	refreshToken: string;
    
}