import { useState, useEffect } from 'react';
import BillHis from '../../components/user/billhis';
import FilterAccount from '../../components/user/filterAccount';
import OrderDetail from '../../components/user/orderDetail';
import useOrder from '../../hook/useOder';
import Loading from '../../theme/loading';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAccount from '../../hook/useAccount';

const MyAccount = () => {
  const [activePage, setActivePage] = useState<string>('Tài khoản của tôi');
  const { order, loadingOrder } = useOrder();
  const { accountDT, updateAccountById } = useAccount();
  const user = JSON.parse(window.localStorage.getItem('user'));
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const welcomQTV = () => {
    toast("Xin chào quản trị viên");
  };

  useEffect(() => {
    if (accountDT) {
      setFormData({
        name: accountDT.name || "",
        phone: accountDT.phone || "",
        address: accountDT.address || "",
      });
    }
  }, [accountDT]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const updatedUser = { ...accountDT, ...formData };
      const response = await updateAccountById(updatedUser); 
      if (response) {
        toast.success("Cập nhật thông tin thành công!");
        setIsModalOpen(false); 
      }
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại!");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <Loading isShow={loadingOrder} />
      <div>
        <div className="flex mt-7 mb-16">
          <div className="w-1/4"> 
            <FilterAccount setActivePage={setActivePage} />
          </div>
          
          <div className="flex-1 w-3/4"> 
            {activePage === 'Đơn mua' && <BillHis orders={order}/>}  
            {activePage === 'Tài khoản của tôi' && 
              <div>
                <div className="t mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Thông tin cá nhân</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Email:</span>
                    <span className="text-gray-600">{accountDT?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Tên:</span>
                    <span className="text-gray-600">{accountDT?.name || "Chưa cập nhật"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Số điện thoại:</span>
                    <span className="text-gray-600">{accountDT?.phone || "Chưa cập nhật"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Địa chỉ:</span>
                    <span className="text-gray-600">{accountDT?.address || "Chưa cập nhật"}</span>
                  </div>
                </div>

                
                  <div className="mt-5 gap-x-5 flex">
                  {user.role === "admin" && 
                    <Link to="/admin" >
                      <button 
                        onClick={welcomQTV} 
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        Trang Quản Trị
                      </button>
                    </Link>
                    }
                    <button 
                      onClick={() => setIsModalOpen(true)} 
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Cập nhật thông tin
                    </button>
                  </div>
                
              </div>
            } 
          </div>

          {activePage === 'Chi Tiết Đơn Hàng' && <OrderDetail orderDT={order}/>} 
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Cập nhật thông tin cá nhân</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Tên:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Số điện thoại:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Địa chỉ:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  disabled={loading} 
                >
                  {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} // Close modal when cancel
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyAccount;
