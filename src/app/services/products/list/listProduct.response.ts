import { Product } from 'src/app/models/product';
import { Response } from 'src/app/models/response'

export interface ListProductResponse extends Response {

    products: Product[];
    
}