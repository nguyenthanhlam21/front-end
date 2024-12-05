import { useEffect } from 'react';
import axios from 'axios';

export const usePaymentStatus = ({ setischeckOut }) => {
  useEffect(() => {
    console.log("useEffect triggered");
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
    const apptransid = urlParams.get('apptransid');
    const status = urlParams.get('status');
    const app_user = urlParams.get('app_user');
    console.log("status:", status);
    if (status === '1') {
      updatePaymentStatus(app_user);
      setischeckOut(true);
    } else {
      console.log('Payment failed or invalid status');
    }
  }, []);

  const updatePaymentStatus = async (app_user: string) => {
    const _id = app_user;
    const paymentStatus  = "Đã thanh toán";
    console.log(_id, paymentStatus );
    const token = localStorage.getItem('token');
    console.log('Token:', token); 

    if (!token) {
      console.log('No token found in localStorage');
      return;
    }

    try {
      const response = await axios.put('http://localhost:8000/api/cart/update', {
        _id, 
        paymentStatus ,        
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      console.log('Payment status updated:', response.data);

      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return null;
};
