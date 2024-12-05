import axios from 'axios'
import { useEffect, useState } from 'react'
import { TPsize } from '../types/size'


const useProduct = () => {
    const [size,setSize] = useState<TPsize[]>([])
    const [loadingSize, setLoading] = useState<boolean>(false);
    const Getall = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/size");
            const data = response.data;
            console.log('Fetched data:', data);
            if (Array.isArray(data.data)) {
                setSize(data.data);
            } else {
                console.error('Expected an array in data.data, but got:', data);
                setSize([]);
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

  return {size,loadingSize}
}

export default useProduct