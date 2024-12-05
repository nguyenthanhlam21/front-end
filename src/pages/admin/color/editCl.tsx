import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TPcolor } from '../../../types/color';
import axios from 'axios';
import { useLoading } from '../../../contexts/loading';

const EditColorPopup = ({ color, onClose, darkMode }) => {
    const { setLoading } = useLoading();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<TPcolor>();

    useEffect(() => {
        setValue('name', color.name);
        setValue('colorCode', color.colorCode);
    }, [color, setValue]);

    const editColor = async (values: TPcolor) => {
        try {
            setLoading(true);
            const id = color._id;
            const token = window.localStorage.getItem('token');
            const response = await axios.put(`/api/color/update/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
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
            <form onSubmit={handleSubmit(editColor)}>
                <div className={`${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} p-5 rounded`}>
                    <h2 className="text-xl">Sửa Màu</h2>
                    <input 
                        type="text" 
                        {...register('name', { required: true })}
                        className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                    />
                    <input 
                        type="text" 
                        {...register('colorCode', { required: true })}
                        className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                    />
                    <div className="mt-4">
                        <button onClick={() => onClose(null)} className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
                        <button 
                            className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-3 py-1`}
                            type='submit'
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditColorPopup;
