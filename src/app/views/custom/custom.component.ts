import {Component, OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, Form, AbstractControl} from '@angular/forms';

import { MessageService, SelectItem } from 'primeng/primeng';  

import { ActivatedRoute, Router  } from '@angular/router';
import { UploadService } from 'src/app/services/UploadService';
import { UploadRequest } from 'src/app/models/uploadRequest';

@Component({
    templateUrl: './custom.component.html',
    providers: [UploadService]

})
export class CustomComponent implements OnInit {

    banner1File: any[] = [];
    banner2File: any[] = [];
    banner3File: any[] = [];
    banner4File: any[] = [];
    banner5File: any[] = [];

    productform: FormGroup;
    executed: boolean = false;
    selectedCurrencyAcronym: String;
    currenciesAcronyms: SelectItem[];
    actualProductId:String;
 
    constructor( 
        private fb: FormBuilder, 
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

        this.currenciesAcronyms = [];
        this.currenciesAcronyms.push({label: 'Pesos', value: '$'});
        this.currenciesAcronyms.push({label: 'Dolares', value: 'U$S'});

    }

    isAvaiable(){
        return this.productform.valid && !this.executed
    }

    onSubmit(){

        if (this.banner1File.length>0) {
            this.uploadService.execute({
                uploadedFiles: this.banner1File,
                filename: "banners/banner1.jpg"
            } as UploadRequest).subscribe();
        }

        if (this.banner2File.length>0) {
            this.uploadService.execute({
                uploadedFiles: this.banner2File,
                filename: "banners/banner2.jpg"
            } as UploadRequest).subscribe();
        }
        
        if (this.banner3File.length>0) {
            this.uploadService.execute({
                uploadedFiles: this.banner3File,
                filename: "banners/banner3.jpg"
            } as UploadRequest).subscribe();
        }

        if (this.banner4File.length>0) {
            this.uploadService.execute({
                uploadedFiles: this.banner4File,
                filename: "banners/banner4.jpg"
            } as UploadRequest).subscribe();
        }
                        
        if (this.banner5File.length>0) {
            this.uploadService.execute({
                uploadedFiles: this.banner5File,
                filename: "banners/banner5.jpg"
            } as UploadRequest).subscribe();
        }

        this.router.navigate(['/']);
    }


    

    uploadBanner1(event) {
        this.banner1File = event.files
    }

    uploadBanner2(event) {
        this.banner2File = event.files
    }

    uploadBanner3(event) {
        this.banner3File = event.files
    }

    uploadBanner4(event) {
        this.banner4File = event.files
    }

    uploadBanner5(event) {
        this.banner5File = event.files
    }


}
