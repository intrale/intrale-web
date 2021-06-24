import { Address } from "cluster";
import { BackUrls } from "src/app/models/backUrls";
import { PaymentMethod } from "src/app/models/paymentMethods";
import { Product } from "src/app/models/product";
import { Shipments } from "src/app/models/shipments";
import { MercadoPagoResponse } from "../mercadoPagoResponse";

export interface CheckoutPreferencesResponse extends MercadoPagoResponse{
    collector_id:number;
    operation_type:String;
    items:Product[];
    address:Address;
    back_urls:BackUrls;
    auto_return:String;
    payment_methods:PaymentMethod;
    client_id:String;
    marketplace:String;
    marketplace_fee:number;
    shipments:Shipments;
    notification_url:String;
    statement_descriptor:String;
    external_reference:String;
    additional_info:String;
    expires:boolean;
    expiration_date_from:String;
    expiration_date_to:String;
    date_created:String;
    id:String;
    init_point:String;
    sandbox_init_point:String;
}