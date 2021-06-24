import { Id } from "./id";

export interface PaymentMethod {
    excluded_payment_methods:Id[];
    excluded_payment_types:Id[];
    default_payment_method_id:String;
    installments:Number;
    default_installments:Number;
}