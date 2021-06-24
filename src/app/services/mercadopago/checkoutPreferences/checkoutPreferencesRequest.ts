import { BackUrls } from 'src/app/models/backUrls';
import { Id } from 'src/app/models/id';
import { Payer } from 'src/app/models/payer';
import { PaymentMethod } from 'src/app/models/paymentMethods';
import { Product } from 'src/app/models/product';
import { ReceiverAddress } from 'src/app/models/receiverAddress';
import { Shipments } from 'src/app/models/shipments';
import { Track } from 'src/app/models/track';
import { MercadoPagoRequest } from '../mercadoPagoRequest';

export interface CheckoutPreferencesRequest extends MercadoPagoRequest {
    additional_info: String;
    auto_return: String;
    back_urls:BackUrls;
    date_of_expiration:String;
    differential_pricing:Id;
    expiration_date_from:String;
    expiration_date_to:String;
    expires:boolean;
    external_reference:String;
	items:Product[];
    marketplace:String;
    marketplace_fee:number;
    notification_url:String;
    payer:Payer;
    payment_methods:PaymentMethod;
    shipments:Shipments;
    statement_descriptor:String;
    tracks:Track[];
}