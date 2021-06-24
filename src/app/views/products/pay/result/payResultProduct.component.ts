import {Component, OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, Form, AbstractControl} from '@angular/forms';

import { MessageService } from 'primeng/primeng';  

import { ActivatedRoute, Router  } from '@angular/router';

@Component({
    templateUrl: './payResultProduct.component.html',
    providers: []

})
export class PayResultProductComponent implements OnInit {

    collection_id:String;
    collection_status:String;
    external_reference:String;
    payment_type:String;
    preference_id:String;
    site_id:String;
    processing_mode:String
    merchant_order_id:String; 
    
    state:String;
   
    constructor( 
        private activatedRoute:ActivatedRoute ,
        private router:Router,
        protected messageService: MessageService,
        ){}
    
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.state = params['state'];

        });
        this.activatedRoute.queryParamMap.subscribe(params => {
            this.collection_id = params.get('collection_id');
            this.collection_status = params.get('collection_status');
            this.external_reference = params.get('external_reference');
            this.payment_type = params.get('payment_type');
            this.preference_id = params.get('preference_id');
            this.site_id = params.get('site_id');
            this.processing_mode = params.get('processing_mode');
            this.merchant_order_id = params.get('merchant_order_id');

            console.log('Query Params:' + params.keys.toString());
        })
    }

 
}
