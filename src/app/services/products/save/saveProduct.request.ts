import { Price } from 'src/app/models/price';
import { Request } from 'src/app/models/request'

export interface SaveProductRequest extends Request {
	productId:string;
	category:string;
    name: string;
	description: string;
	price: Price;
	oldPrice: Price;
	stock: number;
}