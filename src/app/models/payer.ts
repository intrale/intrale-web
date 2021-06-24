import { Address } from "./address";
import { Identification } from "./identification";
import { Phone } from "./phone";

export interface Payer {
    name: String;
    surname: String;
    email: String;
    phone: Phone;
    identification:Identification;
    address:Address;
    date_created:String;
}