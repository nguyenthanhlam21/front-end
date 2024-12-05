import React, { useEffect, useState } from 'react';
import TitleMainLeft from '../../theme/titleMainLeft';
import BoxProduct from '../../theme/boxProduct';
import Loading from '../../theme/loading';
import useProduct from '../../hook/useProduct';

const ProductNew = () => {
    const [displayCount, setDisplayCount] = useState(5);
    const { products, loading } = useProduct();

    useEffect(() => {
        const updateDisplayCount = () => {
            const width = window.innerWidth;
            setDisplayCount(
                width < 640 ? 2 :
                width < 1024 ? 3 :
                width < 1280 ? 4 : 5
            );
        };

        updateDisplayCount();
        window.addEventListener('resize', updateDisplayCount);
        return () => {
            window.removeEventListener('resize', updateDisplayCount);
        };
    }, []);
    const sortedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <>
        <Loading isShow={loading} />
            <TitleMainLeft text={`Sản phẩm mới về`} />
            <div className="flex gap-x-4 mt-7">
                {sortedProducts.length > 0 ? (
                    sortedProducts.slice(0, displayCount).map(product => (
                        <BoxProduct key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </>
    );
}

export default ProductNew;
