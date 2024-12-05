import { useState } from 'react';
import axios from 'axios';
import { TPpayment } from '../types/payment';

export const useCreatePayment = () => {
  const [transactionId, setTransactionId] = useState<TPpayment[]>([])
  const [error, setError] = useState(null);

  const createPayment = async (amount,cartIds) => {
    
    const firstCartId = cartIds[0];
    const app_user = firstCartId;
    console.log(amount, app_user);
   
    try {
      const response = await axios.post('http://localhost:8000/payment', {
        amount,
        app_user,
      });
      setTransactionId(response.data.app_trans_id);
      console.log(transactionId);   
      window.location.href = response.data.order_url;
    } catch (err) {
      setTransactionId(null);
      if (axios.isAxiosError(err)) {
        console.error('Error response:', err.response?.data);
        setError(err.response?.data || 'An error occurred while processing the payment');
      } else {
        console.error('Error:', err.message);
        setError(err.message || 'An unknown error occurred');
      }
    }
  };
  
  return { createPayment, transactionId, error };
};