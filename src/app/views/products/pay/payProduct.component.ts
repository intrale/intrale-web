import {Component, OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, Form, AbstractControl} from '@angular/forms';

import { MessageService } from 'primeng/primeng';  

import { ActivatedRoute, Router  } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductDummy } from 'src/app/services/products/dummy/productDummy';
import { CheckoutPreferencesService } from 'src/app/services/mercadopago/checkoutPreferences/checkoutPreferencesService';
import { CheckoutPreferencesRequest } from 'src/app/services/mercadopago/checkoutPreferences/checkoutPreferencesRequest';
import { PaymentMethod } from 'src/app/models/paymentMethods';

@Component({
    templateUrl: './payProduct.component.html',
    providers: [CheckoutPreferencesService]

})
export class PayProductComponent implements OnInit {
    id: String;
   
    productform: FormGroup;
    product: Product;
 
    constructor( 
        private fb: FormBuilder, 
        private productDummy: ProductDummy,
        private activatedRoute:ActivatedRoute ,
        private router:Router,
        protected messageService: MessageService,
        private checkoutPreferencesService: CheckoutPreferencesService

        ){}
    
    ngOnInit() {

        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
            console.log('Product ID:' + this.id);
            this.productDummy.getProducts().then(
                products => {
                    products.forEach(actualProduct => {
                       if (actualProduct.id == this.id){
                           this.product = actualProduct;
                       } 
                    });
                } 

            )
        });

        this.productform = this.fb.group({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', null /*Validators.required*/),
            details: new FormControl('', null /*Validators.required*/),
            stock: new FormControl('', null /*Validators.required*/),
            price: new FormControl('', null /*Validators.required*/)
        });

    }

    onSubmit(){
   
        this.checkoutPreferencesService.execute({
                external_reference:'leonel@larreta.com.ar',
                payer:{
                    name:'Lalo',
                    surname:'Landa',
                    email:'test_user_63274575@testuser.com',
                    phone:{
                        area_code:'11',
                        number:'22223333'
                    },
                    address:{
                        street_name:'Falsa',
                        street_number:'123',
                        zip_code:'1111'
                    }
                },
                items: [this.product],
                payment_methods: {
                    excluded_payment_methods:[{id:'amex'}],
                    excluded_payment_types:[{id:'atm'}],
                    installments: 6
                },
                auto_return:'approved',
                back_urls:{
                    success: window.location.origin + '/#/products/result/success',
                    pending: window.location.origin + '/#/products/result/pending',
                    failure: window.location.origin + '/#/products/result/failure'
                },
                notification_url:'https://mgnr0htbvd.execute-api.us-east-2.amazonaws.com/dev/mercadopago'
            } as unknown as CheckoutPreferencesRequest).subscribe(
            value => {
                window.location.href = value.init_point.toString();

            },
            error => {

            }
        )

    }

}
