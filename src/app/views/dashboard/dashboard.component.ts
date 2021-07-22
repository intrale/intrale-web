import {Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute, Router  } from '@angular/router';

import {ConfirmationService} from 'primeng/api'

import {DeleteUserService} from 'src/app/services/auth/deleteuser/deleteuser.service';
import {DeleteUserRequest} from 'src/app/services/auth/deleteuser/deleteuser.request'

import { User } from 'src/app/models/user';
import { ListUsersRequest } from 'src/app/services/auth/listusers/listusers.request';
import { Car } from 'src/app/demo/domain/car';
import { CarService } from 'src/app/demo/service/carservice';
import { Product } from 'src/app/models/product';
import { ProductDummy } from 'src/app/services/products/dummy/productDummy';

@Component({
    templateUrl: './dashboard.component.html',
    providers:[]
})
export class DashboardComponent implements OnInit  {

    products: Product[];

    constructor(private productDummy: ProductDummy, private activatedRoute:ActivatedRoute ,
        private router:Router,) {
        console.log('Dashboard constructor');
     }

    ngOnInit() {
        console.log('Dashboard ngOnInit');
        this.productDummy.getProducts().then(products => {
            this.products = products;
            this.products.forEach(product=>{
                product.picture_url = window.location.origin + product.picture_url + ".webp";
            });
            console.log('Dashboard products:' + this.products.length);

        });
    }

    onSubmit(product: Product){
        console.log('Quiere comprar :' + product.title);
        this.router.navigate(['products/pay', product.id]);
    }

}
