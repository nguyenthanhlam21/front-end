import React, { useEffect } from 'react';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { TPbrand } from '../../../types/brand';
import { toast } from 'react-toastify';

const EditPopup = ({ brand, onClose, darkMode }) => {
    const { setLoading } = useLoading();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<TPbrand>();

    useEffect(() => {
        setValue('name', brand.name);
    }, [brand, setValue]);

    const editSBrand = async (values: TPbrand) => {
        try {
            setLoading(true);
            const id = brand._id;
            const token = window.localStorage.getItem('token');
            const response = await axios.put(`/api/brand/update/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            toast.success("Sửa thương hiệu thành công");
            onClose();
            window.location.reload();
        } catch (error) {
            let errorMessage = 'An error occurred. Please try again.';
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error);
                errorMessage = error.response?.data?.message || errorMessage;
            } else {
                console.error('Error:', error.message);
            }
            alert(errorMessage); 
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(editSBrand)}>
                <div className={`p-5 rounded ${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-xl">Sửa kích thước</h2>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    />
                    {errors.name && <span className="text-red-500">This field is required.</span>}
                    <div className="mt-4">
                        <button onClick={onClose} type="button" className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
                        <button type="submit" className={`px-3 py-1 text-white ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditPopup;
