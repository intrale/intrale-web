import {Component, OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, Form, AbstractControl} from '@angular/forms';

import { MessageService, SelectItem } from 'primeng/primeng';  

import { ListGroupsService } from 'src/app/services/auth/listgroups/listgroups.service'
import { ListGroupsRequest } from 'src/app/services/auth/listgroups/listgroups.request';

import { GetUserService } from 'src/app/services/auth/getuser/getuser.service'
import { GetUserRequest } from 'src/app/services/auth/getuser/getuser.request';

import { EditUserService } from 'src/app/services/auth/edituser/edituser.service'
import { EditUserRequest } from 'src/app/services/auth/edituser/edituser.request';

import { ActivatedRoute, Router  } from '@angular/router';
import { Group } from 'src/app/models/group';
import { SaveProductService } from 'src/app/services/products/save/saveProduct.service';
import { SaveProductRequest } from 'src/app/services/products/save/saveProduct.request';
import { ListProductService } from 'src/app/services/products/list/listProduct.service';
import { ListProductRequest } from 'src/app/services/products/list/listProduct.request';
import { UploadService } from 'src/app/services/UploadService';
import { UploadRequest } from 'src/app/models/uploadRequest';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './saveProduct.component.html',
    providers: [SaveProductService, ListProductService, UploadService]

})
export class SaveProductComponent implements OnInit {

    mainFile: any[] = [];
    secondFile: any[] = [];
    thirdFile: any[] = [];

    productform: FormGroup;
    executed: boolean = false;
    selectedCurrencyAcronym: String;
    currenciesAcronyms: SelectItem[];
    actualProductId:String;
 
    constructor( 
        private fb: FormBuilder, 
        private saveProductService: SaveProductService,
        private listProductService: ListProductService, 
        private activatedRoute:ActivatedRoute ,
        private router:Router,
        protected messageService: MessageService,
        private uploadService: UploadService
        ){}
    
    ngOnInit() {

        this.productform = this.fb.group({
            productId: new FormControl('', null /*[Validators.required]*/),
            category: new FormControl('', null /*Validators.required*/),
            name: new FormControl('', null /*Validators.required*/),
            description: new FormControl('', null /*Validators.required*/),
            //currencyAcronym: new FormControl('', null /*Validators.required*/),
            unitPrice: new FormControl('', null /*Validators.required*/),
            stock: new FormControl('', null /*Validators.required*/),
        });

        this.activatedRoute.paramMap.subscribe(params => {
            setTimeout(()=> {
            var id = params.get('id');
            if (id) {
            this.listProductService
                .execute({
                    productId : id
                } as ListProductRequest)
                .subscribe(data => {
                    if ((data.products) && (data.products.length>0)){
                        var product = data.products[0];
                        this.actualProductId = product.id;
                        this.productform.setValue({
                            'productId': product.id,
                            'category': product.category,
                            'name': product.name,
                            'description': product.description,
                            /*'currencyAcronym': product.price.currencyAcronym,*/
                            'unitPrice': product.price.unitPrice,
                            'stock': product.stock
                            
                        });
                        this.selectedCurrencyAcronym = product.price.currencyAcronym;
                        
                    }
            })};});

        });
        this.currenciesAcronyms = [];
        this.currenciesAcronyms.push({label: 'Pesos', value: '$'});
        this.currenciesAcronyms.push({label: 'Dolares', value: 'U$S'});

    }

    isAvaiable(){
        return this.productform.valid && !this.executed
    }

    onSubmit(){
        if (!this.selectedCurrencyAcronym){
            this.selectedCurrencyAcronym = '$';
        }
        this.saveProductService.execute(
            {
                productId: this.productform.get('productId').value,
                category: 'default',  
                name: this.productform.get('name').value,
                description: this.productform.get('description').value,
                price: {
                    currencyAcronym: this.selectedCurrencyAcronym,
                    unitPrice: this.productform.get('unitPrice').value
                },
                stock: this.productform.get('stock').value,
            } as SaveProductRequest)
            .subscribe(
                value=> { 
                    if(!this.saveProductService.hasErrors(value)){
                        console.log('uploading');

                        if (this.mainFile.length>0) {
                            this.uploadService.execute({
                                uploadedFiles: this.mainFile,
                                filename: "products/" + value.productId + "/main.jpg"
                            } as UploadRequest).subscribe();
                        }

                        if (this.secondFile.length>0) {
                            this.uploadService.execute({
                                uploadedFiles: this.secondFile,
                                filename: "products/" + value.productId + "/second.jpg"
                            } as UploadRequest).subscribe();
                        }
                        
                        if (this.thirdFile.length>0) {
                            this.uploadService.execute({
                                uploadedFiles: this.thirdFile,
                                filename: "products/" + value.productId + "/third.jpg"
                            } as UploadRequest).subscribe();
                        }
                        
                        this.router.navigate(['/products/list']);
                        
                    }
                }, 
                error => { },
                () => {
                    console.log('Ocurrio un error');
                });

    }

    uploadMain(event) {
        this.mainFile = event.files
    }

    uploadSecond(event) {
        this.secondFile = event.files
    }

    uploadThird(event) {
        this.thirdFile = event.files
    }




}
