import React from 'react';
import { TPproducts } from '../types/products';

type Props = {
  product: TPproducts;
  className?: string;
};

const BoxProduct: React.FC<Props> = ({ product,className }) => {
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : '';
  return (
    <>
    <div className={`border border-300 p-2 pb-5 text-center ${className}`}>
      <a  href={`/product/${product._id}?label=Sản%20phẩm`} className="text-gray-900 no-underline ">
      <div className="overflow-hidden">
        <img 
          src={imageUrl} 
          alt={product.title} 
          className="w-[400px] h-[200px] transition-transform duration-300 ease-in-out transform hover:scale-125 " 
        />
      </div>
        <h3 className="mt-2 text-sm line-clamp-2">{product.title}</h3>
        <p className="mt-1 text-red-700 font-medium">
          {product.price.toLocaleString()} VND
        </p>
      </a>
    </div>
    </>
  );
};

export default BoxProduct;
