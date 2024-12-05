import axios from 'axios'
import { useEffect, useState } from 'react'
import { TPproducts } from '../types/products'
import { useParams } from 'react-router-dom'
import { TPVariant } from '../types/variant'


const useVariant = () => {
    const [loadingVariant, setLoading] = useState<boolean>(false);
    const [variant, setVariant] =  useState<Record<string, TPVariant | null>>({});
    const { variantId } = useParams();
    const getOne = async (variantId: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/variant/${variantId}`);
            setVariant(prev => ({
                ...prev,
                [variantId]: response.data.data
            }));
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
    
    useEffect(()=>{
        if(!variantId) return 
        getOne(variantId)
    },[])
  return {variant,loadingVariant,getOne}
}

export default useVariant