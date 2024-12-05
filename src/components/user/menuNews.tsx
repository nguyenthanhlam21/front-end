import React from 'react';
import InputSearch from '../../theme/inputSearch';
import SearchSVG from '../../svg/searchSVG';
import BoxMenuNews from '../../theme/boxMenuNews';

const menuNewsText = [
    {
        id: "1",
        categoryNews:"sale",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/D%C3%A9p-Puma-Fenty-m%E1%BA%ABu-m%E1%BB%9Bi-nh%E1%BA%A5t-c%E1%BB%A7a-Rihanna-768x576.jpg",
        title: "Dép Puma Fenty mẫu mới nhất của Rihanna",
        date: "22 Tháng Mười, 2019",
        text: "Riri đã chính thức bước chân vào làng thời trang thế giới, khi trở thành giám đốc sáng tạo của thương [...]"
    },
    {
        id: "2",
        categoryNews:"sale",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Cho%C3%A1ng-ng%E1%BB%A3p-v%E1%BB%9Bi-t%E1%BB%A7-gi%C3%A0y-h%C3%A0ng-tr%C4%83m-%C4%91%C3%B4i-768x576.jpg",
        title: "Choáng ngợp với tủ giày hàng trăm đôi",
        date: "22 Tháng Mười, 2019",
        text: "Văn Mai Hương vốn là một mỹ nhân có niềm đam mê cực lớn với giày dép. Cô từng [...]"
    },
    {
        id: "3",
        categoryNews:"sale",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Ch%E1%BB%8Dn-gi%C3%A0y-d%C3%A9p-l%C3%BAc-n%C3%A0o-c%C5%A9ng-v%E1%BB%ABa-in-ch%C3%A2n-768x576.jpg",
        title: "Chọn giày dép lúc nào cũng vừa in chân",
        date: "22 Tháng Mười, 2019",
        text: "Mũi giày hay gót giày không bị biến dạng quá lâu khi bạn cầm lên và bóp nhẹ [...]"
    },
    {
        id: "4",
        categoryNews:"news",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Th%C3%AAm-5-%C4%91%C3%B4i-sneaker-m%C3%A0u-ng%E1%BB%8Dt-l%E1%BB%8Bm-768x576.jpg",
        title: "Thêm 5 đôi sneaker màu ngọt lịm",
        date: "22 Tháng Mười, 2019",
        text: "Nếu bạn vừa mê sneaker màu hồng lại vừa thích chất liệu da lộn thì phiên bản Gazelle màu Easy [...]"
    },
];

const MenuNews = () => {
  return (
    <>
    <div className='flex h-auto relative items-center'>
      <InputSearch 
        ml={undefined} 
        width={`xs:w-[520px] sm:w-[640px] md:w-[900px] lg:w-[230px] 2xl:w-[270px] py-2 px-2 text-[16px]`}  
        padding={`p-1`} 
        border={`border shadow border-shadow`} 
      />
      <div className="flex absolute right-0 bg-[#FF6633] p-1  w-auto items-center justify-center h-full">
        <SearchSVG width={`30px`} height={`30px`} color={`White`} setSearchVisible={function (): void {
          throw new Error('Khong dung den chuc nang nay.');
        }} />
      </div>
    </div>
    <div className="py-6"><h2 className='uppercase font-semibold text-[18px] border-b-4 border-[#B29191] inline'>bài viết mới</h2></div>
    <div className="pr-6">
        {menuNewsText.slice(0,10).map((menu,index)=>(
            <div key={index} className=""><BoxMenuNews id={menu.id} style={`border-b-2 py-1 line-clamp-2`} title={menu.title}/></div>
        ))}
    </div>
    </>
  );
}

export default MenuNews;
