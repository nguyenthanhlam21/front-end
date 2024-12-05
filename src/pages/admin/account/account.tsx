import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import useAccount from '../../../hook/useAccount';
import { toast } from 'react-toastify';



const User = () => {
    const { darkMode } = useTheme();
    const { account,updateRoleToAdmin,updateRoleToMember } = useAccount();
    const [emailFilter, setEmailFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');

    const filteredAccounts = account.filter(account => {
        const emailMatch = emailFilter ? account.email.toLowerCase().includes(emailFilter.toLowerCase()) : true;

        const roleMatch = roleFilter ? account.role === roleFilter : true;

        const startDateMatch = startDateFilter ? new Date(account.createdAt) >= new Date(startDateFilter) : true;
        const endDateMatch = endDateFilter ? new Date(account.createdAt) <= new Date(endDateFilter) : true;

        return emailMatch && roleMatch && startDateMatch && endDateMatch;
    });

    const handleUpdateRole = async (userId) => {
        const isConfirmed = window.confirm('Bạn có chắc muốn cấp quyền admin cho người dùng này?');
        if (isConfirmed) {
            const success = await updateRoleToAdmin(userId);
            if (success) {
                toast.success('Cấp quyền admin thành công!');
            } else {
                toast.error('Cấp quyền admin thất bại!');
            }
        } else {
            console.log('Hành động đã bị hủy.');
        }
    };

    const handleDelRole = async (userId) => {
        const isConfirmed = window.confirm('Bạn có chắc muốn cấp quyền admin cho người dùng này?');
        if (isConfirmed) {
            const success = await updateRoleToMember(userId);
            if (success) {
                toast.success('Bỏ quyền admin thành công!');
            } else {
                toast.error('Bỏ quyền admin thất bại!');
            }
        } else {
            console.log('Hành động đã bị hủy.');
        }
    };
    
    const convertToVietnamTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            hour12: false
        });
    };

    const resetFilters = () => {
        setEmailFilter('');
        setRoleFilter('');
        setStartDateFilter('');
        setEndDateFilter('');
    };
    return (
        <>  
             <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="">
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Lọc Tài Khoản</h2>
                    <div className="flex gap-x-4 mb-4 w-full justify-between ">
                        <div className="flex flex-col w-full">
                            <label className={`${darkMode ? 'text-white' : ''}`} htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Tìm theo email"
                                value={emailFilter}
                                onChange={(e) => setEmailFilter(e.target.value)}
                                className="px-3 py-2 w-full rounded-md border mt-2"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className={`${darkMode ? 'text-white' : ''}`} htmlFor="role">Chức vụ</label>
                            <select
                                id="role"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="px-3 py-2 rounded-md border mt-2"
                            >
                                <option value="">Tất cả</option>
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className={`${darkMode ? 'text-white' : ''}`} htmlFor="start-date">Ngày tạo tài khoản</label>
                            <div className="flex mt-2">
                                <input
                                    id="start-date"
                                    type="date"
                                    value={startDateFilter}
                                    onChange={(e) => setStartDateFilter(e.target.value)}
                                    className="px-3 py-2 rounded-md border"
                                />
                                <span className='px-3 py-2'>Đến</span>
                                <input
                                    id="end-date"
                                    type="date"
                                    value={endDateFilter}
                                    onChange={(e) => setEndDateFilter(e.target.value)}
                                    className="px-3 py-2 rounded-md border"
                                />
                            </div>
                        </div>

                        <button
                            onClick={resetFilters}
                            className={`${darkMode ? 'bg-gray-600' : 'bg-gray-400'} text-white px-3 py-2 rounded-md mt-4`}
                        >
                            Reset
                        </button>
                    </div>
                </div> 
            </div>
            <div className="pb-10">
                <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                    <div className="flex justify-between">
                        <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Danh sách người dùng</h2>
                    </div>
                    <table className="min-w-full mt-4">
                        <thead>
                            <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                                <th className="py-2 px-4 text-left">STT</th>
                                <th className="py-2 px-4 text-left">email</th>
                                <th className="py-2 px-4 text-left">Chức vụ</th>
                                <th className="py-2 px-4 text-left">Ngày tạo</th>
                                <th className="py-2 px-4 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAccounts.map((account,index)=>(
                                <tr key={index}  className={`${darkMode ? 'text-meta-3' : ''}`}>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{index+1}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{account.email}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{account.role}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{convertToVietnamTime(account.createdAt)}</td>
                                    <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4 flex gap-x-3`}>
                                        {account.role === 'member' && (
                                            <button
                                                onClick={() => handleUpdateRole(account._id)}
                                                className={`${darkMode ? 'bg-[#4CAF50]' : 'bg-green-500'} text-white px-3 py-1 rounded-md hover:bg-green-600`}
                                            >
                                                Cấp quyền admin
                                            </button>
                                        )}
                                        {account.role === 'admin' && (
                                            <button
                                                onClick={() => handleDelRole(account._id)}
                                                className={`${darkMode ? 'bg-red-600' : 'bg-red-500'} text-white px-3 py-1 rounded-md hover:bg-red-600`}
                                            >
                                                Bỏ quyền admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default User;
