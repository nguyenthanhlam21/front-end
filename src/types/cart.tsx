import { ObjectId } from "mongoose";

export type Cart = {
    [x: string]: unknown;
    user: ObjectId;
    variantId: ObjectId;
    variantQuantity:number;
    payment:string;
  }