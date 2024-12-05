import React, { useState, useMemo, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend,ArcElement } from "chart.js";
import { useTheme } from "../../../contexts/theme";
import useOrder from "../../../hook/useOder";
import useProducts from "../../../hook/useProduct";
import useSize from "../../../hook/useSize";
import useColor from "../../../hook/useColor";
import useAccount from "../../../hook/useAccount";
import useComment from "../../../hook/useComment";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend,ArcElement);

const Dashboard = () => {
  const { darkMode } = useTheme();
  const { order = [] } = useOrder(); 
  const { products = [] } = useProducts();
  const { color } = useColor(); 
  const { size } = useSize();
  const { account } = useAccount();
  console.log(account);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [sortBy, setSortBy] = useState('orderCount');
  const [sortDirection, setSortDirection] = useState('desc')

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredOrders = useMemo(() => {
    return order.filter(o => {
      const orderDate = new Date(o.createdAt);
      const orderYear = orderDate.getFullYear();
      const orderStatus = o.orderStatus;

      if (fromDate && orderDate < fromDate) return false;
      if (toDate && orderDate > toDate) return false;
      if (selectedYear && orderYear !== parseInt(selectedYear)) return false;
      if (
        orderStatus !== "Đã nhận được hàng" && 
        orderStatus !== "Giao hàng thành công" &&
        orderStatus !== "Đã hủy"
      ) {
        return false;
      }
      return true;
    });
  }, [order, fromDate, toDate, selectedYear]);

  const filteredOrdersDT = useMemo(() => {
    return order.filter(o => {
      const orderDate = new Date(o.createdAt);
      const orderYear = orderDate.getFullYear();
      const orderStatus = o.orderStatus;
  
      if (fromDate && orderDate < fromDate) return false;
      if (toDate && orderDate > toDate) return false;
      if (selectedYear && orderYear !== parseInt(selectedYear)) return false;
  
      return orderStatus === "Đã nhận được hàng" || orderStatus === "Giao hàng thành công";
    });
  }, [order, fromDate, toDate, selectedYear]);

  const monthlyRevenue = useMemo(() => {
    const revenue = Array(12).fill(0);
    filteredOrdersDT.forEach(o => {
      const month = new Date(o.createdAt).getMonth();
      revenue[month] += o.total || 0;
    });
    return revenue;
  }, [filteredOrders]);

  const productMetrics = useMemo(() => {
    const metrics = {};
  
    const sizeMap = size.reduce((acc, s) => {
      acc[s.name] = s._id;  
      return acc;
    }, {});
  
    const colorMap = color.reduce((acc, c) => {
      acc[c.name] = c._id; 
      return acc;
    }, {});
  
    filteredOrders.forEach(o => {
      if (o.orderStatus === "Đã nhận được hàng" || o.orderStatus === "Giao hàng thành công") {
        o.orderItems.forEach(item => {
          const { productId, color, size, quantity } = item;
  
          const colorId = colorMap[color]; 
          const sizeId = sizeMap[size];    
  
          if (!colorId) {
            console.log(`No matching colorId found for color: ${color}`);
          }
  
          if (!sizeId) {
            console.log(`No matching sizeId found for size: ${size}`);
          }
  
          const product = products.find(p => p._id === productId);
          if (product) {
            const variant = product.variant.find(v => v.color === colorId && v.size === sizeId);
            console.log(variant)
            if (variant) {
              if (!metrics[productId]) {
                metrics[productId] = {
                  title: product.title,
                  quantity: 0,
                  revenue: 0,
                  color: color,  
                  size: size,    
                };
              }
  
              metrics[productId].quantity += quantity;
              metrics[productId].revenue += item.price * quantity; 
            } else {
              console.log(`No matching variant found for productId: ${productId}, colorId: ${colorId}, sizeId: ${sizeId}`);
            }
          }
        });
      }
    });
  
    return metrics;
  }, [filteredOrders, products, size, color]);
  
  const successfulOrders = filteredOrders.filter(o => 
    o.orderStatus === "Đã nhận được hàng" || o.orderStatus === "Giao hàng thành công"
  ).length;

  const canceledOrders = filteredOrders.filter(o => o.orderStatus === "Đã hủy").length;

  const chartData = {
    labels: [
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
      "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ],
    datasets: [
      {
        label: `Doanh thu (${selectedYear})`,
        data: monthlyRevenue,
        backgroundColor: darkMode ? "rgba(54, 162, 235, 0.6)" : "rgba(75, 192, 192, 0.6)",
        borderColor: darkMode ? "rgba(54, 162, 235, 1)" : "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const inventoryMetrics = useMemo(() => {
    const metrics = [];
    let totalInventoryValue = 0;
    let totalItemsInStock = 0;
    let totalPurchaseValue = 0; 
  
    const sizeMap = size.reduce((acc, s) => {
      acc[s._id] = s.name;  
      return acc;
    }, {});
    
    const colorMap = color.reduce((acc, c) => {
      acc[c._id] = c.name;  
      return acc;
    }, {});
  

    products.forEach((product) => {
      product?.variant?.forEach((variant) => {
        const { size: sizeId, color: colorId, quantity, salePrice, importPrice } = variant;
  

        totalItemsInStock += quantity;
        totalInventoryValue += quantity * salePrice;
        totalPurchaseValue += quantity * importPrice;
  
        const colorName = colorMap[colorId] || "N/A";
        const sizeName = sizeMap[sizeId] || "N/A";   
  
        metrics.push({
          productId: product._id,
          title: product.title,
          color: colorName, 
          size: sizeName,   
          quantity: quantity,
          salePrice: salePrice,
          purchasePrice: importPrice, 
          inventoryValue: quantity * salePrice, 
          purchaseValue: quantity * importPrice,
        });
      });
    });
  
    return { metrics, totalItemsInStock, totalInventoryValue, totalPurchaseValue };
  }, [products, size, color]);
  
  const customerMetrics = useMemo(() => {
    const metricsByCustomer = {};
  
    filteredOrdersDT.forEach(order => {
      const customerId = order.user;
      const orderTotal = order.total;
  
      if (!metricsByCustomer[customerId]) {
        metricsByCustomer[customerId] = { totalSpent: 0, orderCount: 0 };
      }
  
      metricsByCustomer[customerId].totalSpent += orderTotal || 0;
      metricsByCustomer[customerId].orderCount += 1;
    });
  
    return Object.entries(metricsByCustomer).map(([customerId, metrics]) => {
      const customer = account.find(acc => acc._id === customerId);
      return {
        customerId,
        customerEmail: customer ? customer.email : 'Không có email',
        totalSpent: metrics.totalSpent,
        orderCount: metrics.orderCount,
      };
    });
  }, [filteredOrdersDT, account]);
  

  const sortedCustomerMetrics = useMemo(() => {
    const sorted = [...customerMetrics];
    sorted.sort((a, b) => {
      if (sortBy === 'totalSpent') {
        return sortDirection === 'desc' ? b.totalSpent - a.totalSpent : a.totalSpent - b.totalSpent;
      } else if (sortBy === 'orderCount') {
        return sortDirection === 'desc' ? b.orderCount - a.orderCount : a.orderCount - b.orderCount;
      }
      return 0;
    });
    return sorted;
  }, [customerMetrics, sortDirection, sortBy]);

  const handleSortChange = (sortField) => {
    if (sortBy === sortField) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(sortField);
      setSortDirection('desc');
    }
  };
  
  

  return (
    <>
    <h1 className={` ${darkMode ? " text-white" : " text-black"} pb-6 text-4xl font-bold `}>Dashboard</h1>

    <div className={`mb-10 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} p-4`}>
   
        <div className="mb-4 flex gap-4">
            <div>
            <label htmlFor="fromDate" className="block text-sm font-medium mb-1">Từ ngày:</label>
            <DatePicker
                id="fromDate"
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                dateFormat="yyyy-MM-dd"
                className={`border px-2 py-1 rounded w-full ${
                darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
            />
            </div>
            <div>
            <label htmlFor="toDate" className="block text-sm font-medium mb-1">Đến ngày:</label>
            <DatePicker
                id="toDate"
                selected={toDate}
                onChange={(date) => setToDate(date)}
                dateFormat="yyyy-MM-dd"
                className={`border px-2 py-1 rounded w-full ${
                    darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
                    }`}
            />
            </div>
            <div>
            <label htmlFor="year" className="block text-sm font-medium mb-1">Chọn năm:</label>
            <select
                id="year"
                value={selectedYear}
                onChange={handleYearChange}
                className={`border px-2 py-1 rounded w-full ${
                    darkMode
                      ? "bg-gray-800 text-white border-gray-600"
                      : "bg-white text-black border-gray-300"
                  }`}
            >
                <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                <option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
                <option value={new Date().getFullYear() - 3}>{new Date().getFullYear() - 3}</option>
                <option value={new Date().getFullYear() - 4}>{new Date().getFullYear() - 4}</option>
            </select>
            </div>
        </div>
    </div>

    <div className={`pb-10 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} p-4`}>
    <h1 className={` ${darkMode ? " text-white" : " text-black"} pb-6 text-2xl font-bold `}>Doanh thu</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className={`p-4 border rounded ${
            darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}>
          <h2 className="text-lg font-semibold">Tổng doanh thu</h2>
          <p>{filteredOrdersDT.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString()} VND</p>
        </div>
        <div className={`p-4 border rounded ${
            darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}>
          <h2 className="text-lg font-semibold">Tổng số đơn hàng</h2>
          <p>{filteredOrders.length}</p>
        </div>
        <div className={`p-4 border rounded ${
            darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}>
          <h2 className="text-lg font-semibold">Tổng đơn thành công</h2>
          <p>{successfulOrders}</p>
        </div>
        <div className={`p-4 border rounded ${
            darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}>
          <h2 className="text-lg font-semibold">Tổng đơn bị hủy</h2>
          <p>{canceledOrders}</p>
        </div>
      </div>

      <div className="mb-6 h-[400px] mt-4">
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>

    <div className={`mt-10 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} p-4`}>
        <h2 className={`text-2xl font-semibold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
            Sản phẩm bán chạy
        </h2>
            <table
                className={`mt-4 table-auto w-full border-collapse ${
                darkMode ? "border-gray-600" : "border-gray-300"
                }`}
            >
                <thead>
                <tr className={darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}>
                    <th className={`border px-4 py-2 ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                    ID Sản phẩm
                    </th>
                    <th className={`border px-4 py-2 ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                    Tên sản phẩm
                    </th>
                    <th className={`border px-4 py-2 ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                    Số lượng bán
                    </th>
                    <th className={`border px-4 py-2 ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                    Tổng doanh thu (VND)
                    </th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(productMetrics).map(
                    ([productId, { title, quantity, revenue }], index) => (
                    <tr
                        key={productId}
                        className={`text-center ${
                        darkMode ? (index % 2 === 0 ? "bg-gray-800" : "bg-gray-700") : index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        }`}
                    >
                        <td className={`border px-4 py-2 ${darkMode ? "border-gray-600 text-white" : "border-gray-300 text-black"}`}>
                        {index + 1}
                        </td>
                        <td className={`border px-4 py-2 ${darkMode ? "border-gray-600 text-white" : "border-gray-300 text-black"}`}>
                        {title}
                        </td>
                        <td className={`border px-4 py-2 ${darkMode ? "border-gray-600 text-white" : "border-gray-300 text-black"}`}>
                        {quantity}
                        </td>
                        <td className={`border px-4 py-2 ${darkMode ? "border-gray-600 text-white" : "border-gray-300 text-black"}`}>
                        {revenue.toLocaleString()}
                        </td>
                    </tr>
                    )
                )}
                </tbody>
            </table>
    </div>

    <div className={`mt-10 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4`}>
    <h1 className={`text-2xl font-semibold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
        Người dùng mua hàng
    </h1>
    <div
        className="mb-6"
        style={{
        maxHeight: '300px',
        overflowY: 'auto',
        marginTop: '20px',
        }}
    >
        <table
        className={`table-auto w-full border-collapse ${
            darkMode ? "border-gray-600" : "border-gray-300"
        }`}
        >
        <thead>
            <tr className={darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}>
            <th className={`border px-4 py-2 ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                ID Khách hàng
            </th>
            <th className={`border px-4 py-2 ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                Email
            </th>
            <th className={`border px-4 py-2 ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                <span>Số lượng đơn hàng</span>
                <button
                className="ml-2"
                onClick={() => handleSortChange('orderCount')}
                >
                - {sortBy === 'orderCount' &&
                    (sortDirection === 'desc' ? '↓' : '↑')}
                </button>
            </th>
            <th className={`border px-4 py-2 ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                <span>Tổng tiền đã chi tiêu</span>
                <button
                className="ml-2"
                onClick={() => handleSortChange('totalSpent')}
                >
                - {sortBy === 'totalSpent' &&
                    (sortDirection === 'desc' ? '↓' : '↑')}
                </button>
            </th>
            </tr>
        </thead>
        <tbody>
            {sortedCustomerMetrics.slice(0, 5).map((customer) => (
            <tr
                key={customer.customerId}
                className={
                darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }
            >
                <td
                className={`border px-4 py-2 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                }`}
                >
                {customer.customerId}
                </td>
                <td
                className={`border px-4 py-2 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                }`}
                >
                {customer.customerEmail}
                </td>
                <td
                className={`border px-4 py-2 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                }`}
                >
                {customer.orderCount}
                </td>
                <td
                className={`border px-4 py-2 ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                }`}
                >
                {customer.totalSpent.toLocaleString()} VND
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>

    <CommentDashBoard selectedYear={selectedYear} fromDate={fromDate} toDate={toDate} darkMode={darkMode} />

    <DashboardKho inventoryMetrics={inventoryMetrics} darkMode={darkMode}/>
    </>
  );
};

const removeDiacritics = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

const DashboardKho = ({ inventoryMetrics, darkMode }) => {
  const [filter, setFilter] = useState({
    productName: '',
    color: '',
    size: '',
    minPurchasePrice: '',
    maxPurchasePrice: '',
    minSalePrice: '',
    maxSalePrice: '',
  });

  const [activeFilterColumn, setActiveFilterColumn] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFilterInput = (columnName) => {
    setActiveFilterColumn((prev) => (prev === columnName ? null : columnName));
  };

  const resetFilters = () => {
    setFilter({
      productName: '',
      color: '',
      size: '',
      minPurchasePrice: '',
      maxPurchasePrice: '',
      minSalePrice: '',
      maxSalePrice: '',
    });
    setActiveFilterColumn(null);
  };

  const filteredMetrics = useMemo(() => {
    return inventoryMetrics.metrics.filter((metric) => {
      const {
        productName,
        color,
        size,
        minPurchasePrice,
        maxPurchasePrice,
        minSalePrice,
        maxSalePrice,
      } = filter;

      const matchesProductName = productName
        ? removeDiacritics(metric.title.toLowerCase()).includes(
            removeDiacritics(productName.toLowerCase())
          )
        : true;
      const matchesColor = color
        ? removeDiacritics(metric.color.toLowerCase()).includes(
            removeDiacritics(color.toLowerCase())
          )
        : true;
      const matchesSize = size
        ? removeDiacritics(metric.size.toLowerCase()).includes(
            removeDiacritics(size.toLowerCase())
          )
        : true;

      const matchesPurchasePrice =
        (minPurchasePrice ? metric.purchasePrice >= parseFloat(minPurchasePrice) : true) &&
        (maxPurchasePrice ? metric.purchasePrice <= parseFloat(maxPurchasePrice) : true);

      const matchesSalePrice =
        (minSalePrice ? metric.salePrice >= parseFloat(minSalePrice) : true) &&
        (maxSalePrice ? metric.salePrice <= parseFloat(maxSalePrice) : true);

      return matchesProductName && matchesColor && matchesSize && matchesPurchasePrice && matchesSalePrice;
    });
  }, [inventoryMetrics.metrics, filter]);

  return (
    <div className={`mt-10 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4`}>
      <h1 className={`text-2xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
        Kho
      </h1>

      <div className="mb-6 grid grid-cols-2 gap-4 mt-4">
        <div
          className={`p-4 border rounded ${
            darkMode
              ? 'bg-gray-800 text-white border-gray-600'
              : 'bg-white text-black border-gray-300'
          }`}
        >
          <h2 className="text-lg font-semibold">Sản phẩm tồn kho</h2>
          <p>{inventoryMetrics.totalItemsInStock}</p>
        </div>
        <div
          className={`p-4 border rounded ${
            darkMode
              ? 'bg-gray-800 text-white border-gray-600'
              : 'bg-white text-black border-gray-300'
          }`}
        >
          <h2 className="text-lg font-semibold">Tổng giá trị tồn kho (VND)</h2>
          <p>{inventoryMetrics.totalInventoryValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filter Inputs Section */}
      <div className="mb-6">
        {activeFilterColumn && (
          <div>
            <h3 className="text-lg font-semibold">
            Lọc theo: {activeFilterColumn === 'productName' ? 'Tên sản phẩm' : 
                      activeFilterColumn === 'color' ? 'Màu sắc' : 
                      activeFilterColumn === 'size' ? 'Kích cỡ': 
                      activeFilterColumn === 'minPurchasePrice' ? 'Giá nhập': 
                      activeFilterColumn === 'minSalePrice' ? 'Giá bán': 
                      activeFilterColumn}
            </h3>
            {['productName', 'color', 'size'].includes(activeFilterColumn) && (
              <input
                type="text"
                name={activeFilterColumn}
                value={filter[activeFilterColumn]}
                onChange={handleFilterChange}
                className={`mt-1 w-full p-2 border rounded ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-black'
                }`}
              />
            )}
            {['minPurchasePrice', 'maxPurchasePrice'].includes(activeFilterColumn) && (
              <div className="flex gap-4 mt-2">
                <input
                  type="number"
                  name="minPurchasePrice"
                  placeholder="Giá thấp nhất"
                  value={filter.minPurchasePrice}
                  onChange={handleFilterChange}
                  className={`w-full p-2 border rounded ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
                <input
                  type="number"
                  name="maxPurchasePrice"
                  placeholder="Giá cao nhất"
                  value={filter.maxPurchasePrice}
                  onChange={handleFilterChange}
                  className={`w-full p-2 border rounded ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
              </div>
            )}
            {['minSalePrice', 'maxSalePrice'].includes(activeFilterColumn) && (
              <div className="flex gap-4 mt-2">
                <input
                  type="number"
                  name="minSalePrice"
                  placeholder="Giá thấp nhất"
                  value={filter.minSalePrice}
                  onChange={handleFilterChange}
                  className={`w-full p-2 border rounded ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
                <input
                  type="number"
                  name="maxSalePrice"
                  placeholder="Giá cao nhất"
                  value={filter.maxSalePrice}
                  onChange={handleFilterChange}
                  className={`w-full p-2 border rounded ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
              </div>
            )}
            <div className="flex gap-4 mt-4">
              <button
                onClick={resetFilters}
                className={`px-4 py-2 rounded bg-red-500 text-white ${
                  darkMode ? 'bg-red-700' : 'bg-red-500'
                }`}
              >
                Reset
              </button>
              <button
                onClick={() => setActiveFilterColumn(null)}
                className={`px-4 py-2 rounded bg-blue-500 text-white ${
                  darkMode ? 'bg-blue-700' : 'bg-blue-500'
                }`}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`rounded-lg p-4 ${darkMode ? 'text-white' : 'text-black'}`}
        style={{ maxHeight: '300px', overflowY: 'auto' }}
      >
        <h2 className="text-lg font-semibold mb-4">Chi tiết tồn kho theo sản phẩm</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">STT</th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => toggleFilterInput('productName')}
              >
                Tên sản phẩm
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => toggleFilterInput('color')}
              >
                Màu sắc
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => toggleFilterInput('size')}
              >
                Kích thước
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => toggleFilterInput('minPurchasePrice')}
              >
                Giá nhập
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => toggleFilterInput('minSalePrice')}
              >
                Giá bán
              </th>
              <th className="border border-gray-300 px-4 py-2">Số lượng tồn</th>
              <th className="border border-gray-300 px-4 py-2">Tổng giá trị tồn kho</th>
            </tr>
          </thead>
          <tbody>
            {filteredMetrics.map((metric, index) => (
              <tr
                key={`${metric.productId}-${metric.color}-${metric.size}`}
              >
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {metric.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {metric.color}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {metric.size}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {metric.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {metric.purchasePrice.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {metric.salePrice.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {metric.inventoryValue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CommentDashBoard = ({selectedYear,fromDate,toDate,darkMode}) => {
  const { products = [] } = useProducts();
  const { getCommentByProductId } = useComment(); 
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProductComments, setSelectedProductComments] = useState([]);

  console.log(selectedYear,fromDate,toDate)

  const calculateAverageRating = (comment: any[]) => {
    if (comment.length === 0) return 0;
    const totalRating = comment.reduce((acc, comment) => acc + comment.star, 0);
    return totalRating / comment.length;
  };
  
  const filterComments = (productComments: any[]) => {
    return productComments.filter((comment) => {
      const commentDate = new Date(comment.createdAt);
      const commentYear = commentDate.getFullYear();
  
      const yearToCompare = Number(selectedYear);
  
      if (yearToCompare && commentYear !== yearToCompare) {
        return false;
      }
  
      if (fromDate && commentDate < fromDate) {
        return false;
      }
  
      if (toDate && commentDate > toDate) {
        return false;
      }
  
      return true;
    });
  };
  

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const commentsData: any[] = [];

      for (const product of products) {
        const productComments = await getCommentByProductId(product._id);
        console.log("Product ID:", product._id, "Comments:", productComments);
        const filteredComments = filterComments(productComments);
        console.log("Filtered comments:", filteredComments);
        commentsData.push({
          productId: product._id,
          comment: filteredComments,
          averageRating: calculateAverageRating(filteredComments),
          commentCount: filteredComments.length,
        });
      }

      setComments(commentsData);
      setLoading(false);
    };

    if (products.length > 0) {
      fetchComments();
    }
  }, [products, fromDate, toDate, selectedYear]);

  const handleProductClick = (productId) => {
    const productComments = comments.find(
      (commentData) => commentData.productId === productId
    );
    setSelectedProductComments(productComments ? productComments.comment : []);
  };

  const getChartData = () => {
    const ratingCounts = [0, 0, 0, 0, 0]; 
    selectedProductComments.forEach((comment) => {
      if (comment.star >= 1 && comment.star <= 5) {
        ratingCounts[comment.star - 1]++;
      }
    });
  
    const totalRatings = ratingCounts.reduce((a, b) => a + b, 0);
    const percentageRatings = ratingCounts.map((count) =>
      totalRatings > 0 ? (count / totalRatings) * 100 : 0
    );
  
    return {
      labels: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
      datasets: [
        {
          data: percentageRatings,
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#ffce56',
            '#4caf50',
            '#ff9f40',
          ],
          hoverBackgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#ffce56',
            '#4caf50',
            '#ff9f40',
          ],
        },
      ],
    };
  };
  
  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataValue = tooltipItem.raw; 
            return `${dataValue.toFixed(1)}%`; 
          },
        },
      },
    },
  };
  

  return (
    <div className="flex gap-x-10">
      <div className={`mt-10 p-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} w-2/3`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tổng quan đánh giá sản phẩm</h2>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="max-h-[301px] overflow-y-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead className="">
              <tr className="">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">STT</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Tên sản phẩm</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Ảnh</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Số lượt đánh giá</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Đánh giá trung bình</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const productComments = comments.find(
                  (commentData) => commentData.productId === product._id
                );
                const averageRating = productComments
                  ? productComments.averageRating
                  : 0;
                const commentCount = productComments ? productComments.commentCount : 0;

                return (
                  <tr onClick={() => handleProductClick(product._id)} key={index} className={``}>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{product.title}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-md mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      {commentCount}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      {averageRating.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      </div>
      <div className={`mt-10 p-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} `}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Biểu đồ đánh giá sản phẩm</h2>
      </div>
         {/* {selectedProductComments.length > 0 && ( */}
         
         <div className="">
            <Pie data={getChartData()} options={chartOptions} />
          </div>
        {/* )} */}
      </div>
    </div>
  );
};


export default Dashboard;
