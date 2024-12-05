import { ObjectId } from "mongoose";

export type TPproducts = {
    _id: string;               
    title: string;            
    price: number;            
    description?: string; 
    img_des:string;
    hide?: boolean;           
    discountPercentage?: number; 
    rating?: number;          
    stock?: number;            
    brand: ObjectId;            
    category: ObjectId;         
    thumbnail?: string;        
    images: string[];        
    variant?: {
        color: ObjectId;
        size: ObjectId;
        quantity: number;
        importPrice: number;
        listPrice: number;
        salePrice: number;
    }[];
    createdAt?: Date;      
    updatedAt?: Date;        
};
