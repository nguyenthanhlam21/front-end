import React, { useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import { Link } from 'react-router-dom';
import useOrder from '../../../hook/useOder';

const OrdersList = () => {
    const { darkMode } = useTheme();
    const { order, loadingOrder } = useOrder();
    const [userId, setUserId] = useState('');
    const [orderCode, setOrderCode] = useState('');
    const [minTotal, setMinTotal] = useState('');
    const [maxTotal, setMaxTotal] = useState('');
    const [orderStatus, setOrderStatus] = useState('');

    const fitt = order?.filter(bill => 
        bill.orderStatus === 'Chờ xử lý' || bill.orderStatus === 'Chờ xác nhận hủy đơn hàng' || bill.orderStatus === 'Đã xác nhận' || bill.orderStatus === 'Đang giao hàng' || bill.orderStatus === 'Giao hàng thành công'
    );

    const filteredOrders = fitt?.filter(bill => {
        let isMatch = true;
        if (userId && bill.user.toLowerCase() !== userId.toLowerCase()) {
            isMatch = false;
        }
        if (orderCode && !bill.orderCode.toLowerCase().includes(orderCode.toLowerCase())) {
            isMatch = false;
        }

        if (
            (minTotal && bill.total < parseFloat(minTotal)) ||
            (maxTotal && bill.total > parseFloat(maxTotal))
        ) {
            isMatch = false;
        }
        if (orderStatus && bill.orderStatus !== orderStatus) {
            isMatch = false;
        }

        return isMatch;
    });

    const resetFilters = () => {
        setUserId('');
        setOrderCode('');
        setMinTotal('');
        setMaxTotal('');
        setOrderStatus('');
    };

    return (
        <>  
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="flex justify-between">
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Lọc đơn hàng</h2>
                </div> 
                <div className="flex gap-4 mb-4">
                    <div className="flex flex-col">
                        <label htmlFor="userId" className="mb-1 text-sm font-semibold">User ID</label>
                        <input
                            id="userId"
                            type="text"
                            className="border p-2 rounded"
                            placeholder='Tìm kiếm theo User Id'
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="orderCode" className="mb-1 text-sm font-semibold">Mã Đơn</label>
                        <input
                            id="orderCode"
                            type="text"
                            className="border p-2 rounded"
                            placeholder='Mã đơn'
                            value={orderCode}
                            onChange={(e) => setOrderCode(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="minTotal" className="mb-1 text-sm font-semibold">Tổng Tiền Đơn Hàng</label>
                        <div className="flex gap-2">
                            <input
                                id="minTotal"
                                type="number"
                                placeholder="Giá trị tối thiểu"
                                className="border p-2 rounded w-32"
                                value={minTotal}
                                onChange={(e) => setMinTotal(e.target.value)}
                            />
                            <span>__</span>
                            <input
                                id="maxTotal"
                                type="number"
                                placeholder="Giá trị tối đa"
                                className="border p-2 rounded w-32"
                                value={maxTotal}
                                onChange={(e) => setMaxTotal(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="orderStatus" className="mb-1 text-sm font-semibold">Trạng Thái</label>
                        <select
                            id="orderStatus"
                            className="border p-2 rounded w-48"
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            <option value="Chờ xử lý">Chờ xử lý</option>
                            <option value="Chờ xác nhận hủy đơn hàng">Chờ xác nhận hủy đơn hàng</option>
                            <option value="Đã xác nhận">Đã xác nhận</option>
                            <option value="Đang giao hàng">Đang giao hàng</option>
                            <option value="Giao hàng thành công">Giao hàng thành công</option>
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
            </div>

            <div className="pb-10">
                <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                    <div className="flex justify-between">
                        <h2 className={`${darkMode ? 'text-white' : 'text-black'} text-xl font-semibold mb-4`}>Danh sách đơn hàng</h2>
                    </div>
                    <table className="min-w-full mt-4">
                        <thead>
                            <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                                <th className="py-2 px-4 text-left">Bill ID</th>
                                <th className="py-2 px-4 text-left">User ID</th>
                                <th className="py-2 px-4 text-left">Mã Đơn</th>
                                <th className="py-2 px-4 text-left">Trạng Thái</th>
                                <th className="py-2 px-4 text-left">Tổng Tiền</th>
                                <th className="py-2 px-4 text-left">Voucher ID</th>
                                <th className="py-2 px-4 text-left">Ship ID</th>
                                <th className="py-2 px-4 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders?.map((bill, index) => (
                                <tr key={bill._id} className={`${darkMode ? 'bg-[#2A323D] text-meta-3' : 'bg-white text-black'}`}>
                                    <td className="border-b py-2 px-4">{index + 1}</td>
                                    <td className="border-b py-2 px-4">{bill.user}</td>
                                    <td className="border-b py-2 px-4">{bill.orderCode}</td>
                                    <td className="border-b py-2 px-4">{bill.orderStatus}</td>
                                    <td className="border-b py-2 px-4">{bill.total}</td>
                                    <td className="border-b py-2 px-4">{bill.voucher || "none"}</td>
                                    <td className="border-b py-2 px-4">{bill.ship || "none"}</td>
                                    <td className="border-b py-2 px-4">
                                        <Link to={`../bill/detail/${bill._id}`}>
                                            <button className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-3 py-1`}>Chi tiết</button>
                                        </Link>
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

export default OrdersList;
