import { Request } from '../../../models/request'

export interface CreateProductRequest extends Request {
	productName:string;
	description:string;
    details: string;
	stock: string;
	price: string;
}