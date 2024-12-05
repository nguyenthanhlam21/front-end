import React from 'react'
import HomeSVG from '../svg/homeSVG';
import ArowLSVG from '../svg/arowLSVG';
import { useLocation } from 'react-router-dom';

const menuFilterSLect = [
    {
        label:"Mới nhất",
        value:1,
    },
    {
        label:"Thứ tự mức độ phổ biến",
        value:"2",
    },
    {
        label:"Thứ tự theo điểm đánh giá",
        value:"3",
    },
    {
        label:"Thứ tự theo giá: Thấp đến cao",
        value:"4",
    },
    {
        label:"Thứ tự theo giá: Cao đến Thấp",
        value:"5",
    },
]

const filterSlect = ({style,id}) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const label = query.get('label');
    const isProductPage = location.pathname === '/product';
  return (
    <>
    <nav className="xs:px-5 md:px-7 justify-between lg:px-7 xl:px-[150px] flex  py-6 text-gray-700 border border-gray-200 rounded-lg bg-[#F5F5F5] dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
    <ol className="inline-flex w-1/2 items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
        <a href="/" className="inline-flex  items-center text-sm font-medium text-[#B29191] hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <HomeSVG/>
            TRANG CHỦ
        </a>
        </li>
        <li>
        <div className="flex items-center">
            <ArowLSVG/>
            <a href="#" className="ms-1 text-sm font-medium uppercase text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white ">{label}</a>
        </div>
        </li>
    </ol>
    {isProductPage &&
    <div className="w-1/2">
        <form  className="max-w-sm mx-auto">
            <select id={`${id}`} className={` ${style}`}>
            {menuFilterSLect.map((menu,index)=>(
                <option key={index} value={`${menu.value}`}>{menu.label}</option>
            ))}    
            </select>
        </form> 
    </div>
    }
    </nav>
    </>
  )
}

export default filterSlect