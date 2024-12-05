import React from 'react';
import TitleMainCenter from '../../theme/titleMainCenter';
import LogoBrand from '../../theme/logoBrand';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const menuBrand = [
    { id: "1", img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/logo2.jpg" },
    { id: "2", img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/logo5.jpg" },
    { id: "3", img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/logo8.jpg" },
    { id: "4", img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/logo6.jpg" },
    { id: "5", img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/logo7.jpg" },
    { id: "6", img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/logo1.jpg" },
    { id: "7", img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/logo4.jpg" },
    { id: "8", img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/logo3.jpg" },
    { id: "9", img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/logo7.jpg" }
];

const Brand = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        speed: 500,
        centerPadding: '30px',
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    centerPadding: '20px',
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    centerPadding: '15px',
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: '10px',
                    dots: true
                }
            },
            {
                breakpoint: 485,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '5px',
                    dots: true
                }
            },
            {
                breakpoint: 240,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '5px',
                    dots: true
                }
            }
        ]
    };

    return (
        <>
            <TitleMainCenter text={`# Thương hiệu nổi tiếng`} sub={`Chúng tôi luôn đem đến khách hàng những thương hiệu hàng đầu thế giới`} />
            <div className="slider-container mt-5">
                <Slider {...settings}>
                    {menuBrand.map(brand => (
                        <LogoBrand key={brand.id} img={brand.img} />
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default Brand;
