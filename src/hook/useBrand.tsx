import axios from 'axios'
import { useEffect, useState } from 'react'
import { TPproducts } from '../types/products'
import { TPbrand } from '../types/brand'


const useProduct = () => {
    const [brand,setBrand] = useState<TPbrand[]>([])
    const [loadingBrand, setLoading] = useState<boolean>(false);
    const Getall = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/brand");
            const data = response.data;
            console.log('Fetched data:', data);
            if (Array.isArray(data.data)) {
                setBrand(data.data);
            } else {
                console.error('Expected an array in data.data, but got:', data);
                setBrand([]);
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
    };
    useEffect(()=>{
        Getall();
    },[])

  return {brand,loadingBrand}
}

export default useProduct