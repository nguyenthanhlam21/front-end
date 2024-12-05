import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import useOrder from '../../../hook/useOder';
import useProduct from '../../../hook/useProduct';
import useVoucher from '../../../hook/useVoucher';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useOrderHis from '../../../hook/useOrderHis';

const BillDetail = () => {
    const { darkMode } = useTheme();
    const { orders, loadingOrder } = useOrder();
    const { product, getOneProduct } = useProduct(); 
    const {GetOrderHisByorderId, orderHis } = useOrderHis();
    const { orderId } = useParams(); 
    const [products, setProducts] = useState<{ [key: string]: any }>({});
    console.log("jashqehqwe",orderHis);
    
    useEffect(() => {
        if (orderId) {
            GetOrderHisByorderId(orderId); 
            
        }
    }, [orderId]);

    useEffect(() => {
        if (orders && orders.orderItems) {
            orders.orderItems.forEach(item => {
            if (!products[item.productId]) {
              getOneProduct(item.productId);
            }
          });
        }
      }, [orders, products, getOneProduct]);
      
  
      useEffect(() => {
        if (product) {
          setProducts(prev => ({
            ...prev,
            [product._id]: product, 
          }));
        }
      }, [product]);

      const calculateTotalAmount = () => {
        if (!orders?.orderItems) return 0; 
        return orders.orderItems.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      };
      const amouttt = calculateTotalAmount()
    if (loadingOrder) {
        return <p>Loading...</p>;
    }
    console.log("Products:", product);
    

    return (
        <div className="pb-10">
            <h1 className={`${darkMode ? 'text-white' : ''} text-3xl font-bold mb-6`}>Chi tiết đơn hàng: {orders?.orderCode}</h1>
            <RecipientInfo orders={orders} darkMode={darkMode} />
            <ProductInfo amouttt={amouttt} orders={orders} product={product} products={products} darkMode={darkMode} />
            <StatusHistory darkMode={darkMode} orderHis={orderHis} />
            <ChangeStatus  orders={orders} darkMode={darkMode} />
        </div>
    );
};

const RecipientInfo = ({ orders, darkMode }) => (
    <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-20`}>
        <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Thông tin người nhận</h2>
        <div className="flex gap-x-4">
            <InputField label="Mã đơn" value={orders?.orderCode} />
            <InputField label="ID tài khoản đặt hàng" value={orders?.user} />
        </div>
        <div className="flex gap-x-4">
            <InputField label="Tên người nhận" value={orders?.name} />
            <InputField label="SĐT" value={orders?.phone} />
        </div>
        <div className="flex gap-x-4">
            <InputField label="Mã giảm giá" value={orders?.voucher} />
            <InputField label="Địa chỉ" value={orders?.address} />
        </div>
        <InputField label="Trạng thái thanh toán" value={orders?.payment} />
    </div>
);

const InputField = ({ label, value }) => (
    <div className="input-with-placeholder2 w-full">
        <label>{label}</label>
        <input type="text" value={value} disabled required />
    </div>
);

const ProductInfo = ({ orders,amouttt, product,products , darkMode }) => {
    const { voucher } = useVoucher();
    const [validVoucher, setValidVoucher] = useState(null);
    console.log(product);
    

    useEffect(() => {
      const code = orders?.voucher;
      const foundVoucher = voucher.find(v => v.code === code); 
      setValidVoucher(foundVoucher); 
    }, [orders, voucher]);
    console.log(orders);
    
    const totalPrice = orders?.orderItems?.reduce((acc, item) => {
        const variants = product ? product[item.productId] : null;
        if (variants) {
            return acc + (variants.salePrice * item.variantQuantity);
        }
        return acc;
    }, 0) || 0;

    return (
        <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
            <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Thông tin sản phẩm</h2>
            <table className="min-w-full mt-4">
                <thead>
                    <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)] ' : 'bg-gray-200'}`}>
                        <th className="py-2 px-4 text-left">STT</th>
                        <th className="py-2 px-4 text-left">Ảnh</th>
                        <th className="py-2 px-4 text-left">Tên sản phẩm</th>
                        <th className="py-2 px-4 text-left">Biến thể</th>
                        <th className="py-2 px-4 text-left">Số lượng</th>
                        <th className="py-2 px-4 text-left">Giá bán</th>
                        <th className="py-2 px-4 text-left">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.orderItems?.map((item, index) => {
                        const productVariant = products[item.productId];
                        console.log(productVariant)
                        if (!productVariant) {
                            console.error(`Product variant not found for variant ID: ${item.productId}`);
                            return (
                                <tr key={item.variantId}>
                                    <td colSpan="6">Product variant not found for variant ID: {item.productId}</td>
                                </tr>
                            );
                        }             

                        return (
                            <tr key={index}>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>{index + 1}</td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}><img className='h-[100px]' src={productVariant.images[0]} alt="" /></td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>{productVariant.title}</td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>Màu: {item.color || 'N/A'}, Size: {item.size || 'N/A'}</td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>{item.variantQuantity}</td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>{item.price.toLocaleString()} VNĐ</td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>{(item.price * item.variantQuantity).toLocaleString()} VNĐ</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={`${darkMode ? 'text-bodydark2' : 'text-black'} w-full flex flex-col items-end px-[90px]`}>
                <p><strong>Tổng tiền sản phẩm:</strong> {amouttt.toLocaleString()} VNĐ</p>
                <p>
                    <strong>Giảm giá voucher:</strong>
                    {validVoucher ? (
                    <span > {validVoucher.value} %</span>
                  ) : (
                    <span >0 %</span>
                  )}
                </p>
                <p><strong>Tổng tiền cả đơn:</strong> {(orders?.total !== undefined ? orders.total.toLocaleString() : 0)} VNĐ</p>
            </div>
        </div>
    );
};


const StatusHistory = ({ darkMode, orderHis }) => {
    return (
        <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-20}`}>
            <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4}`}>Lịch sử thay đổi trạng thái</h2>
            <ul>
                {orderHis?.map((status, index) => {
                    const timestamp = new Date(status.createdAt);
                    const formattedCreatedAt = isNaN(timestamp)
                        ? 'N/A'
                        : timestamp.toLocaleString('vi-VN', {
                              timeZone: 'Asia/Ho_Chi_Minh',
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              hour12: false,
                          });

                    return (
                        <li key={index} className={`${darkMode ? 'text-bodydark2' : 'text-black'} mb-2}`}>
                            _{status.user} - <strong>{status.status}</strong> - {status.description} - {formattedCreatedAt}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};




const ChangeStatus = ({ orders, darkMode }) => {
    console.log(orders)
    const { updateOrderById, loadingOrder,getOneOrderByUserIdAndOrderId } = useOrder(); 
    const { createOrder } = useOrderHis();
    const [description, setDescription] = useState(''); 

    const handleUpdateOrderStatus = async (newStatus) => {
        const updatedData = {
            user: orders?.user,
            orderCode: orders?.orderCode,
            orderStatus: newStatus,
            name: orders?.name,
            address: orders?.address,
            phone: orders?.phone,
        };

        try {
            await updateOrderById(orders._id, updatedData); 
            toast.warning(`Đơn hàng ${newStatus}.`);
            const user = JSON.parse(window.localStorage.getItem('user'));
            const user_id = user ? user._id : null;
            console.log(user_id); 
            const historyData = {
                order: orders._id,
                status: newStatus,
                description: description ,
                user: user_id,
            };
            console.log("gwef",historyData);
            
            await createOrder(historyData);

            if (orders?.user && orders._id) {
                await getOneOrderByUserIdAndOrderId(orders._id); 
            }
            window.location.reload();
        } catch (error) {
            console.error("Error updating order status:", error); 
        }
    };

    return (
        <>
            <input
                type="text"
                className="w-full mt-5 p-3   rounded-lg shadow-md pb-20}"
                placeholder="Ghi chú"
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            />
            {orders?.orderStatus === "Chờ xử lý" && (
                <div className="gap-x-4 flex">
                    <button 
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"  
                        onClick={() => handleUpdateOrderStatus("Đã xác nhận")} 
                        disabled={loadingOrder}
                    >
                        Đã xác nhận
                    </button>
                    <button 
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded" 
                        onClick={() => handleUpdateOrderStatus("Đã hủy")} 
                        disabled={loadingOrder}
                    >
                        Hủy đơn hàng
                    </button>
                </div>
            )}
            {orders?.orderStatus === "Đã xác nhận" && (
                <div className="mt-4 ">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={() => handleUpdateOrderStatus("Đang giao hàng")} 
                    disabled={loadingOrder}
                    >
                        Đang giao hàng
                    </button>
                    <button 
                        className="mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded" 
                        onClick={() => handleUpdateOrderStatus("Đã hủy")} 
                        disabled={loadingOrder}
                    >
                        Hủy đơn hàng
                    </button>
                </div>
            )}
            {orders?.orderStatus === "Đang giao hàng" && (
                <div className="mt-4 ">
                    <button className="bg-yellow-400 text-white px-4 py-2 rounded"
                    onClick={() => handleUpdateOrderStatus("Giao hàng thành công")} 
                    disabled={loadingOrder}
                    >
                        Giao hàng thành công
                    </button>
                    <button 
                        className="mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded" 
                        onClick={() => handleUpdateOrderStatus("Đã hủy")} 
                        disabled={loadingOrder}
                    >
                        Hủy đơn hàng
                    </button>
                </div>
            )}
            {( orders?.orderStatus === "Đã hủy" || orders?.orderStatus === "Đã nhận được hàng") && (
                <div className="mt-4">
                    <button 
                        className="bg-amber-300 text-white px-4 py-2 rounded"
                    >
                    <Link to={`/admin/bill/history`}>Lịch sử đơn hàng</Link> 
                    </button>
                </div>
            )}
            {(orders?.orderStatus === "Giao hàng thành công") && (
                <div className="mt-4">
                    <button 
                        className="bg-amber-300 text-white px-4 py-2 rounded"
                    >
                    <Link to={`/admin/bill/list`}>Danh sách đơn hàng</Link> 
                    </button>
                </div>
            )}
            {orders?.orderStatus === "Chờ xác nhận hủy đơn hàng" && (
                <div className="mt-4">
                    <button className="bg-yellow-400 text-white px-4 py-2 rounded"
                    onClick={() => handleUpdateOrderStatus("Đã hủy")} 
                    disabled={loadingOrder}
                    >
                        Xác nhận hủy đơn hàng
                    </button>
                </div>
            )}
        </>
    );
};

export default BillDetail;
