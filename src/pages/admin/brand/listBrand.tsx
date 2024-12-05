import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { TPbrand } from '../../../types/brand';
import EditPopup from './editBrand';
import AddPopup from './addBrand';
import { toast } from 'react-toastify';

const listBrand = () => {
    const { darkMode } = useTheme();
    const { setLoading } = useLoading();
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [brands, setBrands] = useState<TPbrand[]>([]);

    const getAllBrand = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/api/brand");
          setBrands(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getAllBrand();
      },[]);

      const handleDeleteBrand = async (brandId: string) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
             await axios.delete(`/api/brand/delete/${brandId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.warning(`Đã xóa thương hiệu ${brandId}`);
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

    const handleEditClick = (brand: TPbrand) => { 
        setSelectedBrand(brand);
        console.log(brand);
        setEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setSelectedBrand(null);
    };

    const handleAddBrand = (newBrand: string) => {
        brands.push({ id: brands.length + 1, brand: newBrand });
    };

    
    return (
        <div className="pb-10">
            <div className={`p-4 rounded-lg shadow-md mt-6 ${darkMode ? 'bg-[#24303F]' : 'bg-white'}`}>
                <div className="flex justify-between">
                    <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : ''}`}>Danh sách thương hiệu</h2>
                    <button
                        className={`px-3 py-1 rounded-md hover:bg-gray-600 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}
                        onClick={() => setAddPopupOpen(true)}
                    >
                        Thêm thương hiệu
                    </button>
                </div>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                            <th className="py-2 px-4 text-left">Id</th>
                            <th className="py-2 px-4 text-left">Thương hiệu</th>
                            <th className="py-2 px-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((brand) => (
                            <tr key={brand._id} className={`${darkMode ? 'text-meta-3' : ''}`}>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{brand._id}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{brand.name}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                    <button onClick={() => handleDeleteBrand(brand._id)} className={`${darkMode ? 'bg-[#E94E77] text-white' : 'bg-red-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-red-600`}>
                                        Xóa
                                    </button>
                                    <button
                                        className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}
                                        onClick={() => handleEditClick(brand)}
                                    >
                                        Sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEditPopupOpen && selectedBrand && (
                    <EditPopup brand={selectedBrand} onClose={closeEditPopup} darkMode={darkMode} />
                )}
                {isAddPopupOpen && (
                    <AddPopup onClose={() => setAddPopupOpen(false)} onAdd={handleAddBrand} darkMode={darkMode} />
                )}
            </div>
        </div>
    );
};

export default listBrand;
