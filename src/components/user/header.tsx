import React, { useState } from 'react';
import Logo from '../../theme/logo';
import MenuHeader from '../../theme/menuHeader';
import { Link } from 'react-router-dom';
import SearchSVG from '../../svg/searchSVG';
import CartSVG from '../../svg/cartSVG';
import BarSVG from '../../svg/barSVG';
import BarLeft from './barLeft';
import CartSideLeft from './cartSideLeft';
import { toast } from 'react-toastify';
import Search from './Search';

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false); // Tạo state để quản lý Search component
    const [isOprnBarLeft, setOprnBarLeft] = useState(false);
    const [isOprnCartLeft, setOprnCartLeft] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    const buttonOBL = () => {
        setOprnBarLeft(!isOprnBarLeft);
    };

    const buttonOBCL = () => {
        setOprnCartLeft(!isOprnCartLeft);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.success("Đăng xuất thành công!");
    };

    const menus = [
        { label: "Trang chủ", link: "/" },
        { label: "Sản phẩm", link: "/product" },
        { label: "Khuyến mãi", link: "/sale" },
        { label: "Tin tức", link: "/new" },
        { label: "Liên hệ", link: "/contact" },
        {
            label: (
                <div className="relative group">
                    <SearchSVG width={`25px`} height={`25px`} color={`black`} onClick={() => setIsSearchOpen(true)} />
                </div>
            ),
            link: "#",
        },
        {
            label: (
                user ? (
                  <button className="relative group">
                    {/* Icon */} 
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <div className="absolute left-0 w-48 bg-white z-[100] dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:block hidden transition-opacity duration-300 ease-in-out">
                        <Link to={`/account`}><div className="px-4 py-2 text-gray-800 dark:text-white">Trang cá nhân</div></Link>
                        <button onClick={handleLogout}><div className="px-4 py-2 text-gray-800 dark:text-white">Đăng xuất</div></button>
                    </div>
                  </button>
                ) : (
                <Link to={`/login`}>
                  <button className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </button>
                </Link>
                )
              ),          
            link: "#",
        },
        {
            label: (
                <button onClick={buttonOBCL} className="flex items-center">
                    <CartSVG />
                </button>
            ),
            link: "#",
        },
    ];

    return (
        <>
        <header>
            <div className="w-full xs:justify-between flex xs:px-4 sm:px-4 lg:px-5 xl:px-[150px] border-b items-center">
                <button onClick={buttonOBL} className="xs:block md:hidden xl:hidden"><BarSVG /></button>
                <Logo size={`xs:w-[60px] md:w-[100px] xl:w-[100px]`} />
                <div className="md:flex xs:hidden w-full justify-end">
                    {menus.map((menu, index) => (
                        <Link to={`${menu.link}?label=${encodeURIComponent(menu.label)}`} key={index}>
                            <MenuHeader style={`xs:hidden sm:hidden md:block lg:block xl:block mx-3 flex tracking-[0.02em] leading-[16px] p-[5px]`} font={`font-[600]`} size={`text-[18px]`} menu={menu.label} menuCT={undefined} />
                        </Link>
                    ))}
                </div>
                <div className="xs:block md:hidden xl:hidden">
                    {menus[menus.length - 1].label}
                </div>
            </div>
        </header>
        {isSearchOpen && <Search onClose={() => setIsSearchOpen(false)} />}  
        {isOprnBarLeft && <BarLeft toggleOBL={buttonOBL} />}
        {isOprnCartLeft && <CartSideLeft toggleOBCL={buttonOBCL} />}
        </>
    );
}

export default Header;
