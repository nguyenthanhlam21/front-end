import React, { useState } from 'react';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { TPVoucher } from '../../../types/voucher';

const AddPopup = ({ onClose, onAdd, darkMode }) => {
    const { setLoading } = useLoading();
    const [vouchers, setVouchers] = useState<TPVoucher[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TPVoucher>();

    const addVoucher = async (values: TPVoucher) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            const response = await axios.post("/api/voucher", values, {
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
            <form onSubmit={handleSubmit(addVoucher)} action="">
                <div className={`p-5 rounded ${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-xl">Thêm Mã giảm giá</h2>
                    <input
                        type="text"
                        {...register('code', {
                            required: "Code is required",
                        })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập Code"
                    />
                    <input
                        type="number"
                        {...register('value', {
                            required: "Value is required",
                        })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập Giá trị (%)"
                    />
                    <input
                        type="text"
                        {...register('description', {
                            required: "Description is required",
                        })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập mô tả"
                    />
                    <input
                        type="number"
                        {...register('maxPrice', {
                            required: "Price max is required",
                        })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Giá trị tối thiếu để áp mã"
                    />
                   <input
                        type="date"
                        {...register('endDate', {
                            required: "End date is required",
                            validate: (value) => {
                                const today = new Date();
                                const selectedDate = new Date(value);
                                return selectedDate > today || "Ngày kết thúc không hợp lệ";
                            },
                        })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    />
                    {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
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
