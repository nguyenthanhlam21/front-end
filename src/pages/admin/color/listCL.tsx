import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import ColorTable from '../../../components/admin/tableColor';
import AddColorPopup from './addCl';
import EditColorPopup from './editCl';
import { TPcolor } from '../../../types/color';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';

const ColorList = () => {
    const { darkMode } = useTheme();
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const { setLoading } = useLoading();
    const [colors, setColors] = useState<TPcolor[]>([]);
    const [searchName, setSearchName] = useState<string>(""); 
    const [searchId, setSearchId] = useState<string>(""); 
    const [searchCode, setSearchCode] = useState<string>(""); 
    
    const getAllColor = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/api/color");
          setColors(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        getAllColor();
      },[]);
    
    const handleAddColor = (name, code) => {
        setColors([...colors, { id: colors.length + 1, name, code }]);
    };

    const handleEditClick = (color) => {
        setSelectedColor(color);
        setEditPopupOpen(true);
    };

    const handleSaveEdit = (id, updatedColor) => {
        setColors(colors.map(color => (color.id === id ? { id, ...updatedColor } : color)));
        setEditPopupOpen(false);
        setSelectedColor(null);
    };

    const handleDeleteColor = async (colorId: string) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
             await axios.delete(`/api/color/delete/${colorId}`, {
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
    };

    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filteredColor = colors.filter((color) => {
        const matchesName = searchName
            ? normalizeString(color.name).includes(normalizeString(searchName))
            : true;
        const matchesId = searchId
            ? normalizeString(color._id).includes(normalizeString(searchId))
            : true;
        const matchesCode = searchCode
            ? normalizeString(color.colorCode).includes(normalizeString(searchCode))
            : true;
    
        return matchesName && matchesId && matchesCode;
    });

    return (
        <>
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="">
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Lọc màu sắc</h2>
                    <div className="w-full mb-4 flex gap-x-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên..."
                            className="border p-2 rounded w-1/2"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo ID..."
                            className="border p-2 rounded w-1/2"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo mã màu"
                            className="border p-2 rounded w-1/2"
                            value={searchCode}
                            onChange={(e) => setSearchCode(e.target.value)}
                        />
                    </div>
                </div> 
            </div>
            <div className="pb-10">
                <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                    <div className="flex justify-between">
                        <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Danh sách màu</h2>
                        <button 
                            className={`${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'} px-3 py-1 rounded-md hover:bg-gray-600`}
                            onClick={() => setAddPopupOpen(true)}
                        >
                            Thêm màu
                        </button>
                    </div>
                    <ColorTable 
                        colors={filteredColor} 
                        darkMode={darkMode} 
                        onEdit={handleEditClick} 
                        onDelete={handleDeleteColor}
                    />
                    {isAddPopupOpen && (
                        <AddColorPopup onClose={() => setAddPopupOpen(false)} onAdd={handleAddColor} darkMode={darkMode} />
                    )}
                    {isEditPopupOpen && selectedColor && (
                        <EditColorPopup color={selectedColor} onClose={(id, updatedColor) => handleSaveEdit(id, updatedColor)} darkMode={darkMode} />
                    )}
                </div>
            </div>
        </>
    );
};

export default ColorList;
