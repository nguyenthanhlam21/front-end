import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import EditPopup from './editVoucher';
import AddPopup from './addVoucher';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { TPVoucher } from '../../../types/voucher';

const Voucherlist = () => {
    const { darkMode } = useTheme();
    const { setLoading } = useLoading();
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [vouchers, setVouchers] = useState<TPVoucher[]>([]);
    const [filterCode, setFilterCode] = useState('');
    const [filterIsActive, setFilterIsActive] = useState('');
    const [filterMinValue, setFilterMinValue] = useState('');
    const [filterMaxValue, setFilterMaxValue] = useState('');
    const [filterMinPrice, setFilterMinPrice] = useState('');
    const [filterMaxPrice, setFilterMaxPrice] = useState('');


    const getAllVoucher = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/api/voucher");
          setVouchers(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getAllVoucher();
      },[]);

      const handleDeleteVoucher = async (voucherId: string) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
             await axios.delete(`/api/voucher/delete/${voucherId}`, {
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

    const handleEditClick = (voucher: TPVoucher) => { 
        setSelectedVoucher(voucher);
        console.log(voucher);
        setEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setSelectedVoucher(null);
    };

    const handleAddVoucher= (newVoucher: string) => {
        vouchers.push({ id: vouchers.length + 1, voucher: newVoucher });
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        const formatter = new Intl.DateTimeFormat('vi-VN', options);
        // return formatter.format(new Date(dateString));
    };

    const filteredVouchers = vouchers.filter((voucher) => {
        let isMatch = true;

        if (filterCode && !voucher.code.toLowerCase().includes(filterCode.toLowerCase())) {
            isMatch = false;
        }

        if (filterIsActive && voucher.isActive !== (filterIsActive === 'true')) {
            isMatch = false;
        }

        if (
            (filterMinValue && voucher.value < parseFloat(filterMinValue)) ||
            (filterMaxValue && voucher.value > parseFloat(filterMaxValue))
        ) {
            isMatch = false;
        }

        if (
            (filterMinPrice && voucher.maxPrice < parseFloat(filterMinPrice)) ||
            (filterMaxPrice && voucher.maxPrice > parseFloat(filterMaxPrice))
        ) {
            isMatch = false;
        }

        return isMatch;
    });
    
    const resetFilters = () => {
        setFilterCode('');
        setFilterIsActive('');
        setFilterMinValue('');
        setFilterMaxValue('');
        setFilterMinPrice('');
        setFilterMaxPrice('');
    };
    
    
    return (
        <>
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="">
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Lọc Voucher</h2>
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex flex-col w-2/3">
                            <label htmlFor="filterCode" className="mb-1 text-sm font-semibold">
                                <span className={`${darkMode ? 'text-white' : ''}`}>Mã Code</span>
                            </label>
                            <input
                                id="filterCode"
                                type="text"
                                placeholder="Tìm theo Code"
                                className="border p-2 rounded w-full"
                                value={filterCode}
                                onChange={(e) => setFilterCode(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="filterIsActive" className="mb-1 text-sm font-semibold">
                                <span className={`${darkMode ? 'text-white' : ''}`}>Trạng thái</span>
                            </label>
                            <select
                                id="filterIsActive"
                                className="border p-2 rounded w-48"
                                value={filterIsActive}
                                onChange={(e) => setFilterIsActive(e.target.value)}
                            >
                                <option value="">Tất cả</option>
                                <option value="true">Còn hạn</option>
                                <option value="false">Hết hạn</option>
                            </select>
                        </div> 

                        <div className="flex items-end">
                            <button
                                className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={resetFilters}
                            >
                                Reset
                            </button>
                        </div>
                    </div> 
                    <div className="flex">
                        <div className="w-1/2">
                            <label htmlFor="filterValue" className="mb-1 text-sm font-semibold">
                                <span className={`${darkMode ? 'text-white' : ''}`}>Giá trị giảm (%)</span>
                            </label>
                            <div className="flex flex-wrap gap-4 mb-4 mt-1">          
                                <div className="flex flex-wrap mb-4"> 
                                    <input
                                        id="filterValue"
                                        type="number"
                                        placeholder="Giá trị tối thiểu"
                                        className="border p-2 rounded w-60"
                                        value={filterMinValue}
                                        onChange={(e) => setFilterMinValue(e.target.value)}
                                    />
                                    <span>__</span>
                                    <input
                                        id="filterValue"
                                        type="number"
                                        placeholder="Giá trị tối đa"
                                        className="border p-2 rounded w-60"
                                        value={filterMaxValue}
                                        onChange={(e) => setFilterMaxValue(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="filterMaxPrice" className="mb-1 text-sm font-semibold">
                                <span className={`${darkMode ? 'text-white' : ''}`}>Giá trị áp mã tối thiểu</span>
                            </label>
                            <div className="flex flex-wrap gap-4 mb-4 mt-1">          
                                <div className="flex flex-wrap mb-4"> 
                                    <input
                                        id="filterValue"
                                        type="number"
                                        placeholder="Giá trị tối thiểu"
                                        className="border p-2 rounded w-60"
                                        value={filterMinPrice}
                                        onChange={(e) => setFilterMinPrice(e.target.value)}
                                    />
                                    <span>__</span>
                                    <input
                                        id="filterValue"
                                        type="number"
                                        placeholder="Giá trị tối đa"
                                        className="border p-2 rounded w-60"
                                        value={filterMaxPrice}
                                        onChange={(e) => setFilterMaxPrice(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="pb-10">
                <div className={`p-4 rounded-lg shadow-md mt-6 ${darkMode ? 'bg-[#24303F]' : 'bg-white'}`}>
                    <div className="flex justify-between">
                        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : ''}`}>Danh sách kích mã giảm giá</h2>
                        <button
                            className={`px-3 py-1 rounded-md hover:bg-gray-600 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}
                            onClick={() => setAddPopupOpen(true)}
                        >
                            Thêm mã giảm giá
                        </button>
                    </div>
                    <table className="min-w-full mt-4">
                        <thead>
                            <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                                <th className="py-2 px-4 text-left">Stt</th>
                                <th className="py-2 px-4 text-left">Code</th>
                                <th className="py-2 px-4 text-left">Giá trị giảm (%)</th>
                                <th className="py-2 px-4 text-left">Mô tả</th>
                                <th className="py-2 px-4 text-left">Giá tối thiểu áp mã</th>
                                <th className="py-2 px-4 text-left">Ngày bắt đầu</th>
                                <th className="py-2 px-4 text-left">Ngày kết thúc</th>
                                <th className="py-2 px-4 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVouchers.map((voucher,index) => (
                                <tr key={index} className={`${darkMode ? 'text-meta-3' : ''}`}>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{index+1}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.code}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.value}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.description}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.maxPrice?.toLocaleString()}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher?.createdAt}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher?.endDate}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                        <button onClick={() => handleDeleteVoucher(voucher._id)} className={`${darkMode ? 'bg-[#E94E77] text-white' : 'bg-red-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-red-600`}>
                                            Xóa
                                        </button>
                                        <button
                                            className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}
                                            onClick={() => handleEditClick(voucher)}
                                        >
                                            Sửa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isEditPopupOpen && selectedVoucher && (
                        <EditPopup voucher={selectedVoucher} onClose={closeEditPopup} darkMode={darkMode} />
                    )}
                    {isAddPopupOpen && (
                        <AddPopup onClose={() => setAddPopupOpen(false)} onAdd={handleAddVoucher} darkMode={darkMode} />
                    )}
                </div>
            </div>
        </>
    );
};

export default Voucherlist;
