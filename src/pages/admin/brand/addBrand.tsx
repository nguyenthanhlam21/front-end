import React, { useState } from 'react';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { TPbrand } from '../../../types/brand';
import { toast } from 'react-toastify';

const AddPopup = ({ onClose, onAdd, darkMode }) => {
    const { setLoading } = useLoading();
    const [brands, setBrands] = useState<TPbrand[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TPbrand>();

    const addBrand = async (values: TPbrand) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            const response = await axios.post("/api/brand", values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 
            onClose();
            toast.success("Thêm thương hiệu thành công");
            console.log(response.data);
            window.location.reload();
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

    return (
        <div className="fixed ml-[280px] inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(addBrand)} action="">
                <div className={`p-5 rounded ${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-xl">Thêm thương hiệu</h2>
                    <input
                        type="text"
                        {...register('name', {
                            required: "Size is required",
                        })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập thương hiệu"
                    />
                    <div className="mt-4">
                        <button onClick={onClose} className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
                        <button
                            className={`px-3 py-1 text-white ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
                            type='submit'
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddPopup;
