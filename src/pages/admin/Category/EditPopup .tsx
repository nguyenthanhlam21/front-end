import React, { useState } from 'react';
import { toast } from 'react-toastify';

const EditPopup = ({ category, onClose, darkMode, onSave }) => {
    const [name, setName] = useState(category.name);

    const handleSave = () => {
        if (name.trim()) {
            onSave(category._id, name);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} p-5 rounded`}>
                <h2 className="text-xl">Sửa danh mục</h2>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                />
                <div className="mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
                    <button 
                        className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-3 py-1`}
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPopup;
