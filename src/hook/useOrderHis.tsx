import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TPorderHis } from '../types/orderHis';

const useOrderHis = () => {
    const [loading, setLoadingOrderHis] = useState(false);
    const [orderHis, setOrderHIs] = useState<TPorderHis>();
    const [orderHiss, setOrderHIss] = useState<TPorderHis[]>([]);

    const GetOrderHisByorderId = async (orderId:string) => {
        try {
            setLoadingOrderHis(true);
            const response = await axios.get(`/api/orderHis/getStt/${orderId}`);
            const data = response.data;
            console.log('Fetched data order by id:', data);
            setOrderHIs(data.data);          
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoadingOrderHis(false);
        }
    };
    const createOrder = async (historyData) => {
        try {
            setLoadingOrderHis(true);
            const response = await axios.post('/api/orderHis', historyData);
            setOrderHIss(response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoadingOrderHis(false);
        }
    };

    return { GetOrderHisByorderId,orderHis,createOrder};
};

export default useOrderHis;
