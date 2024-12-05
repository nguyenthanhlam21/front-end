import React from 'react';

const ColorTable = ({ colors, darkMode, onEdit, onDelete }) => {
    return (
        <table className="min-w-full mt-4">
            <thead>
                <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                    <th className="py-2 px-4 text-left">Id</th>
                    <th className="py-2 px-4 text-left">Tên</th>
                    <th className="py-2 px-4 text-left">Mã màu</th>
                    <th className="py-2 px-4 text-left">Demo</th>
                    <th className="py-2 px-4 text-left"></th>
                </tr>
            </thead>
            <tbody>
                {colors.map((color,index) => (
                    <tr className={`${darkMode ? 'text-meta-3' : ''}`} key={index}>
                        <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{index + 1}</td>
                        <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4 w-1/4`}>{color.name}</td>
                        <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4 w-1/4`}>{color.colorCode}</td>
                        <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4 w-1/4`}>
                            <div className="h-10 w-10" style={{ backgroundColor: color.colorCode }}></div>
                        </td>
                        <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>
                            <button 
                                className={`${darkMode ? 'bg-[#E94E77] text-white' : 'bg-red-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-red-600`}
                                onClick={() => onDelete(color._id)}
                            >
                                Xóa
                            </button>
                            <button 
                                className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}
                                onClick={() => onEdit(color)}
                            >
                                Sửa
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ColorTable;
