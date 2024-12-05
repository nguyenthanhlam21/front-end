import { FC, useState } from "react";
import { Link } from "react-router-dom";
import MenuHeader from "../../theme/menuHeader";
import InputSearch from "../../theme/inputSearch";
import AngleDownSVG from "../../svg/angle-DownSVG";

type Props = {
    toggleOBL: () => void;
};

const BarLeft: FC<Props> = ({ toggleOBL }) => {
    const [isOprnBarLeft, setOprnBarLeft] = useState(true);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const user = JSON.parse(localStorage.getItem('user') || 'null'); // Lấy thông tin người dùng

    const closeOPL = () => {
        setOprnBarLeft(!isOprnBarLeft);
        toggleOBL();
    };

    const menuCategory = [
        { label: "Cao gót", link: "#" },
        { label: "Thể thao", link: "#" },
        { label: "Boots", link: "#" },
        { label: "Đế gỗ", link: "#" },
        { label: "Đế bệt", link: "#" },
        { label: "Giày búp bê", link: "#" },
    ];

    const menuBarLeft = [
        { label: "Trang chủ", link: "/" },
        {
            label: "Sản phẩm",
            link: "/product"
        },
        { label: "Khuyến mãi", link: "/sale" },
        { label: "Tin tức", link: "/new" },
        { label: "Liên hệ", link: "/contact" },
        { label: user ? "Đăng xuất" : "Đăng nhập", link: user ? "#" : "/login" }, 
    ];

    const handleLogout = () => {
        localStorage.removeItem('user'); 
        localStorage.removeItem('token'); 
        alert("User logged out")
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full z-50 ${isOprnBarLeft ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-60" />
            <div className="h-full w-[260px] bg-[rgba(255,255,255)] pt-[50px] relative z-10">
                <div className="w-full h-[55px]">
                    <div className="w-full px-5">
                        <InputSearch width={`w-full`} rounded={`rounded`} padding={`p-1`} border={`border`} />
                    </div>
                </div>
                <div>
                    {menuBarLeft.map((menu, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="flex items-center justify-between w-full border-t last:border-b-0">
                                <Link 
                                    to={user && menu.label === "Đăng xuất" ? "#" : `${menu.link}?label=${encodeURIComponent(menu.label)}`} 
                                    className="flex-1"
                                    onClick={() => {
                                        if (menu.label === "Đăng xuất") {
                                            handleLogout(); 
                                        } else if (menu.link === "/product") {
                                            setActiveSubmenu(null); 
                                        }
                                    }}
                                >
                                    <MenuHeader
                                        style={`w-full py-[15px] px-[20px] text-[rgba(102,102,102,.85)]`}
                                        font={`font-[700]`}
                                        size={`text-[1em]`}
                                        menu={menu.label}
                                        menuCT={undefined}
                                    />
                                </Link>
                                {menu.link === "/product" && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            e.preventDefault(); 
                                            setActiveSubmenu(prev => (prev === "products" ? null : "products"));
                                        }}
                                    >
                                        <AngleDownSVG />
                                    </button>
                                )}
                            </div>
                            {menu.link === "/product" && activeSubmenu === "products" && (
                                <div className="mt-3 mb-7 block px-4">
                                    {menuCategory.map((menuCT, index) => (
                                        <div key={index} className="flex items-center">
                                            <Link to={menuCT.link} className="w-full">
                                                <MenuHeader
                                                    style={`my-1 text-black px-4`}
                                                    font={`font-[400]`}
                                                    size={`text-[1.1em]`}
                                                    menu={menuCT.label}
                                                    menuCT={undefined}
                                                />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={closeOPL} className="absolute top-2 right-3 text-[24px] text-white">X</button>
        </div>
    );
};

export default BarLeft;
