import React, { useState } from "react";
import { useCreatePayment } from "../../hook/usePayment";
const PaymentPage = () => {
  const { createPayment, error } = useCreatePayment();
  const [amount, setAmount] = useState(""); 
  const [orderInfo, setOrderInfo] = useState(""); 

  const handlePayment = async () => {
    if (!amount || !orderInfo) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    await createPayment(amount, orderInfo, "zalopay"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Thanh toán Momo</h1>

      {/* Thông tin thanh toán */}
      <div className="mb-6">
        <label className="block text-lg font-semibold">Số tiền thanh toán:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-4 py-2 mt-2 border rounded-md"
          placeholder="Nhập số tiền"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold">Thông tin đơn hàng:</label>
        <input
          type="text"
          value={orderInfo}
          onChange={(e) => setOrderInfo(e.target.value)}
          className="px-4 py-2 mt-2 border rounded-md"
          placeholder="Nhập thông tin đơn hàng"
        />
      </div>

      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Thanh toán Momo"}
      </button>

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default PaymentPage;
