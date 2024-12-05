import axios from 'axios'
import { useEffect, useState } from 'react'
import { TPproducts } from '../types/products'
import { useParams } from 'react-router-dom'


const useProduct = () => {
    const [products,setProducts] = useState<TPproducts[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [product,setProduct] = useState<TPproducts>()
    const [productDetails, setProductDetails] = useState<{ [key: string]: TPproducts }>({});
    const { id, variantId } = useParams();
    const Getall = async (z) => {
        try {
            setLoading(true);
            const response = await axios.get("/api/products");
            const data = response.data;
            console.log('Fetched data:', data);
            if (Array.isArray(data.data)) {
                setProducts(data.data);
            } else {
                console.error('Expected an array in data.data, but got:', data);
                setProducts([]);
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
    const getOneProduct = async(id : string) =>{
        console.log(id);
        try {
            console.log(id);
            const response = await axios.get("/api/products/"+id)
            setProduct(response.data.data)
            console.log(response.data.data);
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
            
        }
    }

    const getProductByVariantId = async (variantId: string) => {
        console.log("Fetching product for variant ID:", variantId);
        const existingProduct = productDetails[variantId];
        
        console.log("Existing product:", existingProduct);
    
        if (existingProduct) {
            return existingProduct;
        }
        
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/products/variant/${variantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });         
            console.log("Response for variant ID:", variantId, "=>", response.data);
            const product = response.data; 
            setProductDetails(prev => ({ ...prev, [variantId]: product }));
            return product;
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

    const updateVariantQuantity = async (variantId: string, newQuantity: number) => {
        try {
          setLoading(true);
          const token = localStorage.getItem('token');
          const response = await axios.put(`api/products/update/variant/${variantId}`, 
            {quantity: newQuantity}
          , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
          console.log('Variant updated:', response.data);
          if (response.status === 200 && response.data.message === "Cập nhật variant thành công!") {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response.data.message || "Failed to update variant" };
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

    useEffect(() => {
        console.log('Updated product details:', productDetails);
    }, [productDetails]);
    
    useEffect(()=>{
        if(!id) return 
        getOneProduct(id)
    },[])
    useEffect(()=>{
        Getall();
    },[])

  return {products,loading,product,getProductByVariantId,productDetails,getOneProduct,updateVariantQuantity, }
}

export default useProduct