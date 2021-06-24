import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Product } from 'src/app/models/product';

@Injectable()
export class ProductDummy {

    constructor(private http: HttpClient) {}

    getProducts() {
        return this.http.get<any>('assets/data/products.json')
                    .toPromise()
                    .then(res => res.data as Product[])
                    .then(data => data);
    }

}
