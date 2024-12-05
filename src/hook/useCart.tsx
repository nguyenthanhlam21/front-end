import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cart } from '../types/cart';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useCart = () => {
    const [cart, setCart] = useState<Cart[]>([]);
    const [loadingCart, setLoading] = useState<boolean>(false);
    const nav = useNavigate()
    const addToCart = async (values: Cart) => {
        console.log("hahah",values);
        
        try {
            setLoading(true);
            const token = localStorage.getItem('token'); 
            if (!token) {
                toast.warning("Bạn cần đăng nhập!")
                nav("/login")
            }

            const response = await axios.post(
                '/api/cart/add',
                values, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            
            console.log('Added to cart:', response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    const Getall = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get("/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            const data = response.data;
            console.log('Fetched data:', data);
            setCart(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    const Delete = async (variantId: string) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.delete(`/api/cart/remove/${variantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log('Removed from cart:', response.data);
                window.location.reload();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    }
    const DeleteAll = async (userId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.delete(`/api/cart/removeAll/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                console.log('Removed unchecked items from cart:', response.data);
                toast.success("Đã xóa tất cả giỏ hàng!");
                window.location.reload();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    const deleteUncheckedItems = async (userId,uncheckedItems) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`/api/cart/removeUnchecked/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    itemIds: uncheckedItems,
                },
            });
            console.log(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    const updateCart = async (_id, variantQuantity) => {
        console.log(_id, variantQuantity);
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`/api/cart/update`, {_id, variantQuantity },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCart(prevCart => 
                prevCart.map(item =>
                    item._id === _id ? { ...item, variantQuantity: variantQuantity } : item
                )
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        }
    };
    useEffect(()=>{
        Getall();
    },[])
    return {setCart, addToCart, loadingCart ,cart,Delete,DeleteAll,updateCart,deleteUncheckedItems};
};

export default useCart;
