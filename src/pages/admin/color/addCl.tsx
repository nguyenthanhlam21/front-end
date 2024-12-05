import React, { useState } from 'react';
import { useLoading } from '../../../contexts/loading';
import { useForm } from 'react-hook-form';
import { TPcolor } from '../../../types/color';
import axios from 'axios';

const AddColorPopup = ({ onClose, onAdd, darkMode }) => {
    const { setLoading } = useLoading();
    const [colors, setColors] = useState<TPcolor[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TPcolor>();

    const addColor = async (values: TPcolor) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            const response = await axios.post("/api/color", values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 
            onClose();
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
            <form onSubmit={handleSubmit(addColor)}>
                <div className={`${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} p-5 rounded`}>
                    <h2 className="text-xl">Thêm Màu</h2>
                    <input 
                        type="text" 
                        {...register('name', {
                            required: "Color is required",
                        })} 
                        className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                        placeholder="Nhập tên màu"
                    />
                    <input 
                        type="text" 
                        {...register('colorCode', {
                            required: "Color code is required",
                        })}
                        className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                        placeholder="Nhập mã màu (ví dụ: #FF5733)"
                    />
                    <div className="mt-4">
                        <button onClick={onClose} className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
                        <button 
                            className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-3 py-1`}
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

export default AddColorPopup;
