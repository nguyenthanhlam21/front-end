import React, { FC, useEffect, useState } from 'react';
import ButtonRemoveCart from '../../theme/buttonRemoveCart';
import useCart from '../../hook/useCart';
import useProduct from '../../hook/useProduct';
import useVariant from '../../hook/useVariant';

type Props = {
    toggleOBCL: () => void;
};

const CartSideLeft: FC<Props> = ({ toggleOBCL }) => {
    const [isOpenCartLeft, setOpenCartLeft] = useState(true);
    const { cart, loadingCart,Delete } = useCart();
    const { variant, loadingVariant,getOne } = useVariant();
    const { getProductByVariantId,productDetails } = useProduct();

    const closeOPCL = () => {
        setOpenCartLeft(!isOpenCartLeft);
        toggleOBCL();
    };
    console.log("cart:",cart);
    
    const fetchProductDetails = async () => {
        await Promise.all(cart.map(item => {
            if (item.variantId) {
                return getProductByVariantId(item.variantId);
            }
        }));
    };

    useEffect(() => {
        fetchProductDetails();
    }, [cart]);

    useEffect(() => {
        fetchProductDetails();
        cart.forEach(item => {
            if (item.variantId) {
                getOne(item.variantId);
            }
        });
    }, [cart]);

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const product = productDetails[item.variantId];
            const variants = variant[item.variantId];
            const salePrice = variants?.salePrice 
            return product ? total + (salePrice * item.variantQuantity) : total;
        }, 0);
    };
    const total = calculateTotal();
    const getUserId = () => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            return user._id; 
        }
        return null; 
    };
    
    const userId = getUserId();
    console.log(userId);
    
    
    return (
        <div className={`fixed top-0 left-0 w-full h-full z-[300] ${isOpenCartLeft ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-60" />
            <div className="h-full w-[260px] bg-[rgba(255,255,255)] pt-[20px] relative z-10">
                <h2 className='w-full text-center font-bold text-[22px]'>Giỏ Hàng</h2>
                <div className="w-full">
                    <div className="w-[40px] mx-auto mt-3 h-1 bg-slate-300"></div>
                </div>
                <div className="mt-6 overflow-y-auto h-[500px] border-b-2">
                    {cart.length === 0 ? (
                        <p className='w-full text-center'>Chưa có sản phẩm trong giỏ hàng</p>
                    ) : (
                        cart.map((item, index) => {
                            const product = productDetails[item.variantId];
                            const variants = variant[item.variantId];
                            
                            console.log("asdadqwfr",product,variants);
                            if (!product) {
                                console.warn(`Product not found for variant ID: ${item.variantId}`);
                                return (
                                    <div key={index} className="flex justify-between items-center border-b py-2 px-2">
                                        <p>Product not found for variant ID: {item.variantId}</p>
                                    </div>
                                );
                            }

                            if (!product) {
                                return (
                                    <div key={index} className="flex justify-between items-center border-b py-2 px-2">
                                        <p>Product not found for variant ID: {item.variantId}</p>
                                    </div>
                                );
                            }
                            const colorName = variants?.color?.name || 'N/A';
                            const sizeName = variants?.size?.name || 'N/A';
                            const salePrice = variants?.salePrice || 'N/A';
                            return (
                                <div key={index} className="flex justify-between items-center border-b py-2 px-2">
                                    <a href={`/product/${product._id}?label=Sản%20phẩm`} className='w-36'>
                                        <img src={product.images[0]} alt={product.title} className="w-16 h-16 object-cover" />
                                    </a>
                                    <div className="w-full flex-grow">
                                        <h3 className="text-sm font-semibold line-clamp-3">{product.title}</h3>
                                        <div className="flex gap-x-4">
                                            <p className="text-xs text-gray-500">Màu: {colorName}</p>
                                            <p className="text-xs text-gray-500">Kích cỡ: {sizeName}</p>
                                        </div>
                                        <p className="text-xs text-gray-500">Số lượng: {item.variantQuantity}</p>
                                        <p className="text-xs text-gray-500">Giá: {salePrice.toLocaleString()} VNĐ</p>
                                    </div>
                                    {item.payment !== "Đã thanh toán" && (
                                        <button onClick={() => Delete(item._id)} className="text-red-500 text-lg ml-2">
                                            X
                                        </button>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="absolute bottom-0  w-full p-4">
                    <div className="">Tổng: <span className='font-medium text-red-500'>{total.toLocaleString()} VNĐ</span></div>
                    <div className="flex mt-4 gap-x-2">
                        <a className='w-full' href={`/cart/?label=Giỏ%20Hàng`}>
                            <button className="bg-blue-500  mb-2 text-white font-bold w-full py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                            Giỏ Hàng
                            </button>
                        </a>
                        <ButtonRemoveCart style={`w-full`} userId={userId}/>
                    </div>
                </div>
            </div>
            <button onClick={closeOPCL} className="absolute top-2 right-3 text-[24px] text-white">X</button> 
        </div>
    );
};

export default CartSideLeft;
