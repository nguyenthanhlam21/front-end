import React, { useState } from 'react';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { Category } from '../../../types/categories';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddCategoryPopup = ({ onClose, onAdd, darkMode }) => {
    const { setLoading } = useLoading();
    const [categories, setCategories] = useState<Category[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch 
    } = useForm<Category>();

    const createSlug = (name) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[\s+]/g, '-')
            .replace(/[^\w-]+/g, '');
    };

    const addCate = async (values: Category) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            const slug = createSlug(values.name);
            const response = await axios.post("/api/categories", { ...values, slug }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onClose();
            toast.success("Thêm danh mục thành công");
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
            <form onSubmit={handleSubmit(addCate)} action="">
                <div className={`${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} p-5 rounded`}>
                    <h2 className="text-xl">Thêm danh mục</h2>
                    <input 
                        type="text" 
                        {...register('name', {
                            required: "Category is required",
                        })}
                        className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                        placeholder="Nhập danh mục"
                    />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    <div className="mt-4">
                        <button type='button' onClick={onClose} className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
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

export default AddCategoryPopup;
