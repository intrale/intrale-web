import { Group } from "./group";

export interface User {
    email: string;
    name: string;
    familyName: string;
    status: string;
    groups: Group [];
}