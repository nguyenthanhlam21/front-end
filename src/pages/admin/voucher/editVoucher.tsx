import React, { useEffect } from 'react';
import { TPVoucher } from '../../../types/voucher';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const EditPopup = ({ voucher, onClose, darkMode }) => {
    const { setLoading } = useLoading();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<TPVoucher>();

    // Set initial values in the form when voucher prop changes
    useEffect(() => {
        setValue('code', voucher.code);
        setValue('value', voucher.value);
        setValue('description', voucher.description || '');
        setValue('maxPrice', voucher.maxPrice || '');
        setValue('endDate', voucher.endDate?.split('T')[0]); // Format date for input
    }, [voucher, setValue]);

    const editVoucher = async (values: TPVoucher) => {
        try {
            setLoading(true);
            const id = voucher._id;
            const token = window.localStorage.getItem('token');
            const response = await axios.put(`/api/voucher/update/${id}`, values, {
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
        <div className="fixed ml-[280px] inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(editVoucher)}>
                <div className={`p-5 rounded ${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-xl">Sửa Mã Giảm Giá</h2>
                    <input
                        type="text"
                        {...register('code', { required: "Code is required" })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập mã giảm giá"
                    />
                    {errors.code && <span className="text-red-500">{errors.code.message}</span>}

                    <input
                        type="number"
                        {...register('value', { required: "Value is required" })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập giá trị (%)"
                    />
                    {errors.value && <span className="text-red-500">{errors.value.message}</span>}

                    <input
                        type="text"
                        {...register('description')}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập mô tả"
                    />

                    <input
                        type="number"
                        {...register('maxPrice')}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập giá áp mã cao nhất"
                    />

                    <input
                        type="date"
                        {...register('endDate', { required: "End date is required" })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    />
                    {errors.endDate && <span className="text-red-500">{errors.endDate.message}</span>}

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
