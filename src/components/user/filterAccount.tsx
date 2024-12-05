import React from 'react';
import MenuHeader from '../../theme/menuHeader';

interface FilterAccountProps {
  setActivePage: (page: string) => void; // Thêm kiểu cho setActivePage
}

const FilterAccount: React.FC<FilterAccountProps> = ({ setActivePage }) => {
  const menuAccount = [
    { label: "Tài khoản của tôi", link: "#" },
    { label: "Đơn mua", link: "#" },
    { label: "Thông báo", link: "#" },
  ];

  return (
    <div className="pr-4">
      {/* Menu Header */}
      <div className="flex flex-col mb-4">
        {menuAccount.map((menu, index) => (
          <div key={index} className="flex items-center mb-2">
            <a 
              href={menu.link} 
              className="w-full py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition"
              onClick={() => setActivePage(menu.label)}
            >
              <MenuHeader
                style="w-full"
                font="font-[700]"
                size="text-[1em]"
                menu={menu.label}
                menuCT={undefined}
              />
            </a>
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default FilterAccount;