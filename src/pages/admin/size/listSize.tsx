import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import EditPopup from './editSize';
import AddPopup from './addSize';
import { TPsize } from '../../../types/size';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';

const SizeList = () => {
    const { darkMode } = useTheme();
    const { setLoading } = useLoading();
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizes, setSizes] = useState<TPsize[]>([]);

    const getAllSize = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/api/size");
          setSizes(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getAllSize();
      },[]);

      const handleDeleteSize = async (sizeId: string) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
             await axios.delete(`/api/size/delete/${sizeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.reload(); 
        } catch (error) {
            if (error.response?.data?.message === "Token invalid") {
                console.error("Token is invalid. Please log in again.");
            } else {
                console.error("Error adding category:", error.response?.data || error.message);
            }
        } finally {
            setLoading(false);
        }
      }

    const handleEditClick = (size: TPsize) => { 
        setSelectedSize(size);
        console.log(size);
        setEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setSelectedSize(null);
    };

    const handleAddSize = (newSize: string) => {
        sizes.push({ id: sizes.length + 1, size: newSize });
    };

    
    return (
        <div className="pb-10">
            <div className={`p-4 rounded-lg shadow-md mt-6 ${darkMode ? 'bg-[#24303F]' : 'bg-white'}`}>
                <div className="flex justify-between">
                    <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : ''}`}>Danh sách kích thước</h2>
                    <button
                        className={`px-3 py-1 rounded-md hover:bg-gray-600 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}
                        onClick={() => setAddPopupOpen(true)}
                    >
                        Thêm kích thước
                    </button>
                </div>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                            <th className="py-2 px-4 text-left">Id</th>
                            <th className="py-2 px-4 text-left">Kích thước</th>
                            <th className="py-2 px-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizes.map((size) => (
                            <tr key={size._id} className={`${darkMode ? 'text-meta-3' : ''}`}>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{size._id}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{size.name}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                    <button onClick={() => handleDeleteSize(size._id)} className={`${darkMode ? 'bg-[#E94E77] text-white' : 'bg-red-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-red-600`}>
                                        Xóa
                                    </button>
                                    <button
                                        className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}
                                        onClick={() => handleEditClick(size)}
                                    >
                                        Sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEditPopupOpen && selectedSize && (
                    <EditPopup size={selectedSize} onClose={closeEditPopup} darkMode={darkMode} />
                )}
                {isAddPopupOpen && (
                    <AddPopup onClose={() => setAddPopupOpen(false)} onAdd={handleAddSize} darkMode={darkMode} />
                )}
            </div>
        </div>
    );
};

export default SizeList;
