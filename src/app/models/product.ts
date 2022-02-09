import { Price } from "./price";

export interface Product {
    id: String;
    category: String
    name: String;
    description: String;
    price: Price;
    stock:number;
}