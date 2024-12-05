import { useEffect, useState } from 'react';
import axios from 'axios';
import { Order } from '../types/order';
import { useParams } from 'react-router-dom';

const useOrder = () => {
    const [loadingOrder, setLoading] = useState(false);
    const [errors, setError] = useState<string | null>(null); // State để lưu lỗi
    const [oder, setOder] = useState<Order[]>([]);
    const [order, setOrder] = useState<Order>();
    const [orderDT, setOrderDT] = useState<Order>();
    const [orders, setOrders] = useState<Order>();
    const { orderId } = useParams();

    const getUserId = () => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            return user._id; 
        }
        return null; 
    };

    const handleError = (error: any) => {
        if (axios.isAxiosError(error)) {
            setError(error.response?.data?.message || 'Đã xảy ra lỗi');
        } else {
            setError(error.message);
        }
    };

    const Getall = async () => {
        try {
            setLoading(true);
            const userId = getUserId();
            const response = await axios.get(`/api/order/user/${userId}`);
            setOrder(response.data.data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const GetallAdmin = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/order/`);
            setOrder(response.data.data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const GetOrderById = async (orderId: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/order/${orderId}`);
            setOrders(response.data.data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (newOrder) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/order', newOrder, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOder(response.data);
            return response.data;
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const getOneOrderByUserIdAndOrderId = async (orderId: string) => {
        try {
            setLoading(true);
            const userId = getUserId();
            if (userId && orderId) {
                const response = await axios.get(`/api/order/user/${userId}/order/${orderId}`);
                setOrderDT(response.data.data);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderById = async (orderId: string, updatedData) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.put(`/api/order/update/${orderId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Getall();
        GetallAdmin();
    }, []);

    useEffect(() => {
        if (orderId) {
            GetOrderById(orderId);
            getOneOrderByUserIdAndOrderId(orderId);
        }
    }, [orderId]);

    return { 
        createOrder, 
        loadingOrder, 
        oder, 
        order, 
        getOneOrderByUserIdAndOrderId, 
        orderDT, 
        orders, 
        updateOrderById, 
        errors
    };
};

export default useOrder;
