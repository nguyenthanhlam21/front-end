import { ObjectId } from "mongoose";

export type TPcomment = {
    _id: string;
  productIds: ObjectId[];
  userId: string; 
  content: string;
  star: number;
  stt: string;
  show: string;
  createdAt: string;
  updatedAt: string; 
} 