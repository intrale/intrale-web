import { Id } from "./id";
import { ReceiverAddress } from "./receiverAddress";

export interface Shipments {
    mode:String;
    local_pickup:boolean;
    dimensions:String;
    default_shipping_method:Number;
    free_methods:Id[];
    cost:Number;
    free_shipping:boolean;
    receiver_address:ReceiverAddress;

}