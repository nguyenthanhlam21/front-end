import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { Order } from '../../types/order';
import React, { useEffect, useState } from 'react';
import useProduct from '../../hook/useProduct';

type Props = {
  orders: Order[];
};

const BillHis: React.FC<Props> = ({ orders = [] }) => {
  const {  getOneProduct, product } = useProduct();
  const [products, setProducts] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        if (!products[item.productId]) {
          getOneProduct(item.productId);
        }
      });
    });
  }, [orders, products, getOneProduct]); 

  useEffect(() => {
    if (product) {
      setProducts(prev => ({
        ...prev,
        [product._id]: product, 
      }));
    }
  }, [product]);

  if (orders.length === 0) {
    return <div className="text-center text-gray-600">Bạn chưa mua sản phẩm nào</div>;
  }

  return (
    <div className='overflow-y-auto max-h-96'>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">STT</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Mã Đơn</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Thời gian đặt hàng</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Sản phẩm</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Trạng thái</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.orderCode}>
              <td className="border-b border-gray-300 p-4">{index + 1}</td>
              <td className="border-b border-gray-300 p-4 line">{order.orderCode}</td>
              <td className="border-b border-gray-300 p-4">{new Date(order.createdAt || '').toLocaleDateString()}</td>
              <td className="border-b border-gray-300 p-4">
                {order.orderItems.map((item, idx) => {
                  const productt = products[item.productId];
                  return (
                    <div className='line-clamp-1' key={idx}>
                      {productt ? (
                        <>
                          {productt.title} - {item.variantQuantity} - Giá: {item.price.toLocaleString()} đ
                        </>
                      ) : (
                        <span>Loading product...</span> 
                      )}
                    </div>
                  );
                })}
              </td>
              <td className="border-b border-gray-300 p-4">{order.orderStatus}</td>
              <td className="border-b border-gray-300 p-4">
                <Link to={`/order/${order._id}`}>
                  <Button type="primary">Chi tiết</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillHis;
