export type TPVoucher = {
    _id?: string; 
    code: string;
    value: string;
    description?: string;
    maxPrice?: number;
    endDate?: Date;
    createdAt?: Date; 
    updatedAt?: Date; 
}