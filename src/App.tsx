import { useRoutes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/user/homePage';
import AllProduct from './pages/user/allProduct';
import Register from './pages/user/register';
import Login from './pages/user/login';
import SaleNews from './pages/user/saleNews';
import Contact from './pages/user/contact';
import ProductDetail from './pages/user/productDetail';
import DetailNews from './pages/user/detailNews';
import ClientLayout from './layouts/clientlayout';
import AdminLayout from './layouts/adminlayout';
import Dashboard from './pages/admin/Dashboard/dashboard';
import CheckOut from './pages/user/checkOut';
import Cart from './pages/user/cart';
import List from './pages/admin/Product/list';
import Detail from './pages/admin/Product/detail';
import Add from './pages/admin/Product/add';
import ListCT from './pages/admin/Category/ListCT';
import ListSize from './pages/admin/size/listSize';
import ListVoucher from './pages/admin/voucher/listVoucher';
import ListComment from './pages/admin/comment/listComment';
import ListCL from './pages/admin/color/listCL';
import ListBill from './pages/admin/bill/listBill';
import DetailBill from './pages/admin/bill/detailBill';
import axios from 'axios';
import { useEffect, useState } from 'react';
  import { element } from 'prop-types';
import NotFound from './pages/user/notFound';
import ListBrand from './pages/admin/brand/listBrand';
import Edit from './pages/admin/Product/edit';
import MyAccount from './pages/user/myAccount';
import OrderDetail from './components/user/orderDetail';
import HistoryBill from './pages/admin/bill/historyBill';
import Account from './pages/admin/account/account';
import User from './pages/admin/account/account';
import Payment from './pages/user/payment';
import Supports from './pages/user/supports';

const routeConfig = [
  {
  path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element:<Dashboard/>,
      },
      {
        path: "product/dashboard",
        element:<Dashboard/>,
      },
      {
        path: "product/list",
        element:<List/>,
      },
      {
        path: "product/detail/:id",
        element:<Detail/>,
      },
      {
        path: "product/edit/:id",
        element:<Edit/>,
      },
      {
        path: "product/add",
        element:<Add/>,
      },
      {
        path: "category/list",
        element: <ListCT/>,
      },
      {
        path: "size/list",
        element: <ListSize/>,
      },
      {
        path: "color/list",
        element: <ListCL/>,
      },
      {
        path: "bill/list",
        element: <ListBill/>,
      },
      {
        path: "bill/history",
        element: <HistoryBill/>,
      },
      {
        path: "bill/detail/:orderId",
        element:<DetailBill/>,
      },
      {
        path: "brand/list",
        element:<ListBrand/>,
      },
      {
        path: "voucher/list",
        element:<ListVoucher/>,
      },
      {
        path: "account/account",
        element:<Account/>,
      },
      {
        path: "account/listUser",
        element:<User/>,
      },
      {
        path: "comment/listComment",
        element:<ListComment/>,
      },
    ],
  },
  {
    path:"/",
    element:<ClientLayout/>,
    children:[
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/supports',
        element: <Supports />,
      },
      {
        path: '/account',
        element: <MyAccount />,
      },
      {
        path: '/order/:orderId',
        element: <OrderDetail />,
      },
      {
        path: '/product',
        element: <AllProduct />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/sale',
        element: <SaleNews />,
      },
      {
        path: '/new',
        element: <SaleNews />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: 'newSale/:id',
        element: <DetailNews />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <CheckOut />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
    ]
  },
  {
    path:"/notfound",
    element:<NotFound />,
  }
  
];

function App() {
  const routes = useRoutes(routeConfig);
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/data') 
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <main>{routes}</main>
    </>
  );
}

export default App;
