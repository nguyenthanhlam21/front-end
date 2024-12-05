export type TPpayment = {
    appTransId: string; 
    app_user: string;    
    amount: number;    
    status?: 'pending' | 'success' | 'failed'; 
    createdAt?: Date;   
}