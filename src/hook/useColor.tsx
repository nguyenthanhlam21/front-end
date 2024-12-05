import axios from 'axios'
import { useEffect, useState } from 'react'
import { TPcolor } from '../types/color'


const useProduct = () => {
    const [color,setColor] = useState<TPcolor[]>([])
    const [loadingColor, setLoading] = useState<boolean>(false);
    const Getall = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/color");
            const data = response.data;
            console.log('Fetched data:', data);
            if (Array.isArray(data.data)) {
                setColor(data.data);
            } else {
                console.error('Expected an array in data.data, but got:', data);
                setColor([]);
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

  return {color,loadingColor}
}

export default useProduct