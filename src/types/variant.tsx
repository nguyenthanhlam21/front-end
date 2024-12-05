import { ObjectId } from "mongoose";

export type TPVariant = {
    _id: string; 
    product: ObjectId; 
    color: ObjectId; 
    size: ObjectId; 
    quantity?: number; 
    importPrice?: number; 
    listPrice?: number;
    salePrice?: number; 
    isShow?: boolean;
};
