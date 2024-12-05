import { ObjectId } from "mongoose";

export type Order = {
    user: ObjectId;          
    orderCode: string;      
    orderItems: { 
        quantity: number;      
        productId : ObjectId;
        color : string;
        size : string;
        price : number;   
        variantQuantity: number;
    }[]; 
    orderStatus?: string;   
    total?: number;         
    voucher?: string;       
    ship?: string;          
    name: string;          
    address?: string;       
    phone?: number;   
    payment?: string;
    orderHis: ObjectId;    
    createdAt?: Date;      
    updatedAt?: Date;         
}