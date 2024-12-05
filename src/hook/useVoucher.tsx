import axios from 'axios'
import { useEffect, useState } from 'react'
import { TPVoucher } from '../types/voucher';

const useVoucher = () => {
    const [voucher,setVoucher] = useState<TPVoucher[]>([])
    const [loadingVoucher, setLoading] = useState<boolean>(false);
    const Getall = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/voucher");
            const data = response.data;
            console.log('Fetched data voucher:', data);
            if (Array.isArray(data.data)) {
                setVoucher(data.data);
            } else {
                console.error('Expected an array in data.data, but got:', data);
                setVoucher([]);
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

  return {voucher,loadingVoucher}
}

export default useVoucher