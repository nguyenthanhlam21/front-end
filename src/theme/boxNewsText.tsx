import React from 'react';
import { Link } from 'react-router-dom';

const BoxNewsText = ({imgstyle, product,style,h3,categoryNews }) => {
    return (
      <Link to={`/newSale/${product.id}?label=Chi%20tiết`} className={`${style} relative`}>
        <a href={`/newSale/${product.id}?label=Chi%20tiết`} className="w-10 top-3 left-[-10px] absolute h-10 border-[3px] flex justify-center items-center border-[#FF6633] bg-white text-[#FF6633]">{categoryNews}</a>
        <img src={product.img} alt={product.title} className={`${imgstyle}`} />
        <div className="px-3 py-4">
            <h3 className={`${h3}`}>{product.title}</h3>
            <p className="text-xs text-gray-500 ">{product.date}</p>
            <div className="text-[#D2D2D2]">_______</div>
            <p className="text-base line-clamp-3">{product.text}</p>
        </div>
      </Link>
    );
  };
  

export default BoxNewsText;
