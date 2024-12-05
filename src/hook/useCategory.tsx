import axios from 'axios'
import { useEffect, useState } from 'react'
import { Category } from '../types/categories'


const useProduct = () => {
    const [categories,setCategories] = useState<Category[]>([])
    const [loadingCategories, setLoading] = useState<boolean>(false);
    const Getall = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/categories");
            const data = response.data;
            console.log('Fetched data:', data);
            if (Array.isArray(data.data)) {
                setCategories(data.data);
            } else {
                console.error('Expected an array in data.data, but got:', data);
                setCategories([]);
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

  return {categories,loadingCategories}
}

export default useProduct