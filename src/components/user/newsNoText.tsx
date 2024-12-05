import React from 'react';
import BoxNewsNoText from '../../theme/boxNewsNoText';

const menuNews = [
    {   
        id: "1",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/adidas.jpg",
        link: "/news/1",
    },
    {   
        id: "2",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/adidas-2.jpg",
        link: "/news/2",
    },
    {   
        id: "3",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/center-02.jpg",
        link: "/news/3",
    },
    {   
        id: "4",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/moi-02.jpg",
        link: "/news/4",
    },
    {   
        id: "5",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/moi-01.jpg",
        link: "/news/5",
    },
];

const NewsNoText = () => {
  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xs:gap-y-5 sm:gap-y-5  md:gap-x-5 xl:gap-x-5  mb-10">
      <div className="flex w-full flex-col gap-y-5 h-[500px]"> 
        <BoxNewsNoText 
                  link={menuNews[0].link}
                  style={{ backgroundImage: `url(${menuNews[0].img})`, backgroundSize: 'cover', width:'100%', height: '33%' }} setting={undefined}        />
        <BoxNewsNoText 
                  link={menuNews[1].link}
                  style={{ backgroundImage: `url(${menuNews[1].img})`, backgroundSize: 'cover', width:'100%', height: '67%' }} setting={undefined}        />
      </div>
      <BoxNewsNoText 
        link={menuNews[2].link}
        setting={`xs:hidden md:hidden lg:block xl:block`}
        style={{ backgroundImage: `url(${menuNews[2].img})`, backgroundSize: 'cover', width:'100%', height: '100%' }} 
      />
      <div className="flex w-full flex-col gap-y-5 h-[500px]"> 
        <BoxNewsNoText 
                  link={menuNews[3].link}
                  style={{ backgroundImage: `url(${menuNews[3].img})`, backgroundSize: 'cover', width:'100%', height: '67%' }} setting={undefined}        />
        <BoxNewsNoText 
                  link={menuNews[4].link}
                  style={{ backgroundImage: `url(${menuNews[4].img})`, backgroundSize: 'cover', width:'100%', height: '33%' }} setting={undefined}        />
      </div>
    </div>
  );
};

export default NewsNoText;
