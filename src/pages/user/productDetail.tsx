import { useEffect, useState } from 'react';
import DetailP from '../../components/user/detailP';
import ProductNew from '../../components/user/productNew';
import Brand from '../../components/user/brand';
import Loading from '../../theme/loading';
import useProduct from '../../hook/useProduct';

const ProductDetail = () => {
  const {loading,product} = useProduct();
  console.log("dataa",product);
  
  return (
    <>
    <Loading isShow={loading} />
    <DetailP product={product}/>
    <div className="mt-24"><ProductNew /></div>
    <div className="mt-6"><Brand/></div>
    </>
  );
};

export default ProductDetail;
