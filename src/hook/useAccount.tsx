import axios from 'axios'
import { useEffect, useState } from 'react'
import { TPuser } from '../types/user'

const useAccount = () => {
    const [account,setAccount] = useState<TPuser[]>([])
    const [accountDT,setAccountDT] = useState<TPuser>()
    const [loadingAccount, setLoading] = useState<boolean>(false);

    const getUserId = () => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            return user._id; 
        }
        return null; 
    };
    const Getall = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/user");
            const data = response.data;
            console.log('Fetched data:', data);
            if (Array.isArray(data.data)) {
                setAccount(data.data);
            } else {
                console.error('Expected an array in data.data, but got:', data);
                setAccount([]);
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

    const updateRoleToAdmin = async (userId) => {
        try {
            const response = await axios.put(`/api/user/update/${userId}`, { role: 'admin' });
            const updatedUser = response.data.data;

            setAccount((prev) =>
                prev.map((user) => (user._id === userId ? updatedUser : user))
            );
            return true;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    const updateRoleToMember = async (userId) => {
        try {
            const response = await axios.put(`/api/user/update/${userId}`, { role: 'member' });
            const updatedUser = response.data.data;

            setAccount((prev) =>
                prev.map((user) => (user._id === userId ? updatedUser : user))
            );
            return true;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        }
    };
    

    const getAccountById = async () => {
        try {
            setLoading(true);
            const userIdToken = getUserId();
            const response = await axios.get(`/api/user/${userIdToken}`);
            const data = response.data;
            console.log('Fetched data order by id:', data);
            setAccountDT(data.data);          
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

    const updateAccountById = async (updatedUser: TPuser) => {
        try {
          setLoading(true);
          const userIdToken = getUserId();
          const response = await axios.put(`/api/user/update/${userIdToken}`, updatedUser);
          const data = response.data;
    
          console.log('User updated successfully:', data);
    
          setAccountDT(data.data); 
    
          return true;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response?.data);
          } else {
            console.error('Error:', error.message);
          }
          return false;
        } finally {
          setLoading(false);
        }
      };
    
    useEffect(()=>{
        getAccountById();
    },[])
    useEffect(()=>{
        Getall();
    },[])

  return {account,loadingAccount,updateRoleToAdmin,updateRoleToMember,accountDT,updateAccountById}
}

export default useAccount