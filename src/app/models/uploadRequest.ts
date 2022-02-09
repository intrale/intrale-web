import { Request } from "./request";

export interface UploadRequest extends Request{
    uploadedFiles: any[];
    filename:string;
}