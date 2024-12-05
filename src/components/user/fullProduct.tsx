import React from 'react';
import BoxProduct from '../../theme/BoxProduct';
import useProduct from '../../hook/useProduct';
import Loading from '../../theme/Loading';

const FullProduct = ({ filters }) => {
    const { products, loading } = useProduct();

    const filteredProducts = products?.filter(product => {
        const categoryMatch = !filters.category.length || filters.category.includes(product.category?._id);
        const brandMatch = !filters.brand.length || filters.brand.includes(product.brand?._id);
        const sizeMatch = !Object.keys(filters.size).length || product.variant?.some(variant => filters.size[variant.size]);
        const colorMatch = !Object.keys(filters.color).length || product.variant?.some(variant => filters.color[variant.color]);
        return categoryMatch && brandMatch && sizeMatch && colorMatch;
    });


    return (
        <>
            <Loading isShow={loading} />
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-7">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <BoxProduct key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </>
    );
};

export default FullProduct;
