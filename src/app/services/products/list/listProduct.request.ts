import { Request } from 'src/app/models/request'

export interface ListProductRequest extends Request {
	productId: string;
	category: string;
	name:string;
	description:string;
	stock: string;
	price: string;
}