import { ObjectId } from "mongoose";

export type TPorderHis= {
    order: ObjectId; 
    status?: string;
    description?: string;
    user?: string;
    time?: string; 
    createdAt?: Date;      
    updatedAt?: Date; 
};
