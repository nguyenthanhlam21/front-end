import React, { useState, useEffect } from 'react';
import TitleMainLeft from '../../theme/titleMainLeft';
import BoxProduct from '../../theme/boxProduct';
import BoxBgIMG from '../../theme/boxBgIMG';
import Slider from "react-slick"; 
import useProduct from '../../hook/useProduct';
import Loading from '../../theme/loading';
import useCategory from '../../hook/useCategory';

const ContentProduct = () => {
    const { products, loading } = useProduct();
    const { categories,loadingCategories } = useCategory();

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    if (loading || loadingCategories) return <Loading isShow={true} />;

    return (
        <>
            <TitleMainLeft text={`Giày thể thao nữ`} />
            <div className="flex gap-x-4 mt-7">
                <BoxBgIMG fullIMG={`https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/nu.jpg`} />
                <div className="slider-container">
                    <Slider {...settings}>
                        {products.map(product => (
                            <div key={product._id} style={{ padding: '10px' }}>
                                <BoxProduct product={product} className="box-product" />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
}

export default ContentProduct;
