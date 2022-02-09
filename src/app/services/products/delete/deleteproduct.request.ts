import { Request } from 'src/app/models/request'

export interface DeleteProductRequest extends Request {
    productId:string;
}