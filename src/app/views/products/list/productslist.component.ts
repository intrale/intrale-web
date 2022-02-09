import {Component, OnInit, AfterViewInit } from '@angular/core';

import { Router  } from '@angular/router';

import {ConfirmationService} from 'primeng/api'

import { ListProductService } from 'src/app/services/products/list/listProduct.service'

import {DeleteUserService} from 'src/app/services/auth/deleteuser/deleteuser.service';
import {DeleteUserRequest} from 'src/app/services/auth/deleteuser/deleteuser.request'

import { Product } from 'src/app/models/product';
import { ListProductRequest } from 'src/app/services/products/list/listProduct.request';
import { DeleteProductService } from 'src/app/services/products/delete/deleteProduct.service';
import { DeleteProductRequest } from 'src/app/services/products/delete/deleteproduct.request';

@Component({
    templateUrl: './productslist.component.html',
    providers:[ListProductService, ConfirmationService, DeleteProductService]
})
export class ProductsListComponent implements OnInit  {

    cols: any[];

    products: Product[];


    constructor(private listProductService: ListProductService, 
                private router:Router,
                private confirmationService: ConfirmationService,
                private deleteProductService: DeleteProductService
                ) { }

    ngOnInit() {
        this.cols = [
            /*{ field: 'id', header: 'Id' },*/
            /*{ field: 'category', header: 'Categoria' },*/
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Descripcion' },
            { field: 'stock', header: 'Stock' },
            /*{ field: 'price.currencyAcronym', header: 'Moneda' },
            { field: 'price.unitPrice', header: 'Valor' },*/
        ];
 
        setTimeout(()=> {
            this.listProductService.execute({} as ListProductRequest).subscribe(
                data => {
                    this.products = data.products;
                }
            )
        })
 
    }

    onDelete(productId:string){
        this.confirmationService.confirm({
            message: 'Esta seguro que desea eliminar el producto ?',
            accept: () => {
                //Actual logic to perform a confirmation
                this.deleteProductService.execute(
                    {
                        'productId' : productId 
                    } as DeleteProductRequest
                ).subscribe(
                    value => {
                        if (!this.deleteProductService.hasErrors(value)){
                            this.listProductService.execute({} as ListProductRequest).subscribe(
                                data => {
                                    this.products = data.products;
                                    //this.router.navigate(['/#/products/list'])
                                }
                            )
                        }
                    }
                )
            }
        });
    }

    create() {
        this.router.navigate(['/products/save']);
    }
}
