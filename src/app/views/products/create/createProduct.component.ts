import {Component, OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, Form, AbstractControl} from '@angular/forms';

import { MessageService } from 'primeng/primeng';  

import { ListGroupsService } from 'src/app/services/auth/listgroups/listgroups.service'
import { ListGroupsRequest } from 'src/app/services/auth/listgroups/listgroups.request';

import { GetUserService } from 'src/app/services/auth/getuser/getuser.service'
import { GetUserRequest } from 'src/app/services/auth/getuser/getuser.request';

import { EditUserService } from 'src/app/services/auth/edituser/edituser.service'
import { EditUserRequest } from 'src/app/services/auth/edituser/edituser.request';

import { ActivatedRoute, Router  } from '@angular/router';
import { Group } from 'src/app/models/group';
import { CreateProductService } from 'src/app/services/products/create/createProduct.service';
import { CreateProductRequest } from 'src/app/services/products/create/createProduct.request';

@Component({
    templateUrl: './createProduct.component.html',
    providers: [CreateProductService]

})
export class CreateProductComponent implements OnInit {

    productform: FormGroup;
    executed: boolean = false;
 
    constructor( 
        private fb: FormBuilder, 
        private createProductService: CreateProductService,
        private activatedRoute:ActivatedRoute ,
        private router:Router,
        protected messageService: MessageService
        ){}
    
    ngOnInit() {
        
        this.productform = this.fb.group({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', null /*Validators.required*/),
            details: new FormControl('', null /*Validators.required*/),
            stock: new FormControl('', null /*Validators.required*/),
            price: new FormControl('', null /*Validators.required*/)
        });

    }

    isAvaiable(){
        return this.productform.valid && !this.executed
    }

    onSubmit(){
        this.createProductService.execute(
            {
                productName: this.productform.get('name').value,
                description: this.productform.get('description').value,  
                details: this.productform.get('details').value,
                stock: this.productform.get('stock').value,
                price: this.productform.get('price').value,
            } as CreateProductRequest)
            .subscribe(
                value=> { 
                    if(!this.createProductService.hasErrors(value)){



                        this.router.navigate(['/first-component']);



                        
                    }
                }, 
                error => { },
                () => {
                    
                });

    }

}
