import React, { useEffect, useState, useMemo, useRef } from 'react';
import Trash from '../../svg/trash';
import ButtonRemoveCart from '../../theme/buttonRemoveCart';
import useCart from '../../hook/useCart';
import useVariant from '../../hook/useVariant';
import useProduct from '../../hook/useProduct';
import useOrder from '../../hook/useOder';
import useVoucher from '../../hook/useVoucher';
import { toast } from 'react-toastify';
import useAccount from '../../hook/useAccount';
import { Link } from 'react-router-dom';
import { useCreatePayment } from '../../hook/usePayment';
import { usePaymentStatus } from '../../hook/usePaymenStt';
import { tableContainerClasses } from '@mui/material';
import Logo from '../../theme/logo';
const generateOrderCode = () => {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};
const Cart = () => {
    const [checkOut, setischeckOut] = useState(false);
    const [shippingOption, setShippingOption] = useState('regular'); 
    const [shippingFee, setShippingFee] = useState(15000);
    const [voucherCode, setVoucherCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isVoucherValid, setIsVoucherValid] = useState(false);
    const { cart, loadingCart,Delete,updateCart,setCart } = useCart();
    const { variant, loadingVariant,getOne } = useVariant();
    const { voucher } = useVoucher();
    const { getProductByVariantId,updateVariantQuantity,productDetails  } = useProduct();
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const {createOrder,order} = useOrder();
    const {DeleteAll,deleteUncheckedItems } = useCart();
    const { accountDT } = useAccount();
    const [checkedItems, setCheckedItems] = useState(new Set());
    console.log("qweqwe2",order,accountDT);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const { createPayment, error } = useCreatePayment(); 
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    const handlePaymentChange = (method) => {
      setPaymentMethod(method);
      handlePopupClose();
    };

    const handleCheckboxChangeDK = (e) => {
        setIsAgreed(e.target.checked);
    };

    const handlePopupClose = () => {
        setShowPaymentPopup(false); 
      };
    
      const handlePopupOpen = () => {
        setShowPaymentPopup(true); 
      };
    
    const fetchProductDetails = async () => {
        await Promise.all(cart.map(item => {
            if (item.variantId) {
                return getProductByVariantId(item.variantId);
            }
        }));
    };

    useEffect(() => {
        if (accountDT?.name) {
          setUserName(accountDT.name); 
        }
        if (accountDT?.phone) {
            setPhone(accountDT.phone); 
        }
        if (accountDT?.address) {
            setAddress(accountDT.address); 
        }
      }, [accountDT]);
    
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

    useEffect(() => {
        const initialCheckedItems = new Set(cart.map(item => item._id));
        setCheckedItems(initialCheckedItems);
    }, [cart]);
    
    const calculateTotal = (items) => {
        if (!Array.isArray(items)) {
            console.error("Items is not an array:", items);
            return 0; 
        }

        return items.reduce((total, item) => {
            const product = productDetails[item.variantId];
            const variants = variant[item.variantId];
            const salePrice = variants?.salePrice;
            return product ? total + (salePrice * item.variantQuantity) : total;
        }, 0);
    };

    const calculateAmount = () => {
        return shippingFee + total - (total * discount / 100);
    };

    console.log("cart:",cart);

    const handlePayment = async () => {
        const amount = calculateAmount(); 
        const cartIds = cart.map(item => item._id);
        console.log("cartid:",cartIds);
        await createPayment(amount,cartIds);
    };
    
    const checkedCartItems = cart.filter(item => checkedItems.has(item._id));
    const total = calculateTotal(checkedCartItems);

    const handleCheckboxChange = (itemId) => {
        setCheckedItems(prev => {
            const newCheckedItems = new Set(prev);
            if (newCheckedItems.has(itemId)) {
                newCheckedItems.delete(itemId);
            } else {
                newCheckedItems.add(itemId);
            }
            return newCheckedItems;
        });
    };

    const getUserId = () => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            return user._id; 
        }
        return null; 
    };
    const changeQuantity = async (itemId, increment) => {
        console.log(itemId, increment);
        
        const updatedCart = cart.map(item => {
            if (item._id === itemId) {
                const newQuantity = item.variantQuantity + increment;
    
                if (newQuantity < 1) {
                    alert('Số lượng không thể nhỏ hơn 1.');
                    return item;
                }
    
                const variants = variant[item.variantId];
                const availableQuantity = variants?.quantity || 0;
    
                if (newQuantity > availableQuantity) {
                    alert(`Chỉ còn ${availableQuantity} sản phẩm.`);
                    return item;
                }
    
                updateCart(item._id, newQuantity);
                return { ...item, variantQuantity: newQuantity };
            }
            return item;
        });
    
        setCart(updatedCart);
    };
    
    const userId = getUserId();
    console.log(userId);
    const handleCheckout = () => {
        setischeckOut(true);
    };

    const handleCheckoutClose = () =>{
        setischeckOut(false);
    }

    const handleShippingChange = (option) => {
        setShippingOption(option);
        setShippingFee(option === 'express' ? 30000 : 15000); 
    };

    const handleVoucherChange = (e) => {
        const code = e.target.value;
        setVoucherCode(code);
        validateVoucher(code); 
        console.log(code)
    };
    
    const validateVoucher = (code) => {
        console.log(voucher);
        console.log(order);
        const validVoucher = voucher.find(v => v.code === code);
        const isVoucherUsed = order?.some(v => v.voucher === code);
        console.log(isVoucherUsed);
        

        if (isVoucherUsed) {
            toast.warning("Voucher này đã được sử dụng!");
            setVoucherCode('')
            setDiscount(0);
            setIsVoucherValid(false);
            return;  
        }
    
        if (validVoucher) {
            const totalBeforeDiscount = calculateTotal(checkedCartItems);
            if (totalBeforeDiscount >= validVoucher.maxPrice) {
                setDiscount(Number(validVoucher.value));
                setIsVoucherValid(true);
            } else {
                toast.warning(`Giá trị đơn hàng phải tối thiểu ${validVoucher.maxPrice.toLocaleString()} VNĐ để áp dụng mã này.`);
                setDiscount(0);
                setVoucherCode('')
                setIsVoucherValid(false);
            }
        } else {
            setDiscount(0);
            setIsVoucherValid(false);
        }
    };

    const hasSubmitted = useRef(false);
    useEffect(() => {
        const checkAndSubmit = async () => {
            const checkedCartItems = cart.filter(item => checkedItems.has(item._id));
            const paymentt = checkedCartItems.length > 0 ? checkedCartItems[0].payment : "";

            if (paymentt === "Đã thanh toán" && !hasSubmitted.current) {
                hasSubmitted.current = true; 
                await handleSubmit();
            }
        };

        if (cart.length > 0 && checkedItems.size > 0) {
            checkAndSubmit();
        }
    }, [cart, checkedItems]); 
    
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const checkedCartItems = cart.filter(item => checkedItems.has(item._id));
        const paymentt = checkedCartItems.length > 0 ? checkedCartItems[0].payment : "";
        const uncheckedCartItems = cart.filter(item => checkedItems.has(item._id)).map(item => item._id);
        const total = calculateTotal(checkedCartItems);   
        const amountTotal = calculateAmount();
        for (let item of checkedCartItems) {
            const variantId = item.variantId;
            const currentVariant = productDetails[variantId];
    
            if (currentVariant) {
                const availableQuantity = currentVariant.quantity;
                const newQuantity = availableQuantity - item.variantQuantity;
    
                // If stock is insufficient, notify and stop the process
                if (newQuantity < 0) {
                    toast.error(`Số lượng sản phẩm "${currentVariant.title}" không đủ để thanh toán.`);
                    return; 
                }
            } else {
                toast.error(`Không tìm thấy sản phẩm cho variant ID: ${variantId}`);
                return;
            }
        }
        
        const orderDetails = {
            user: getUserId(),
            orderCode: generateOrderCode(),
            orderItems: cart.filter(item => checkedItems.has(item._id)).map((item, index) => {
                const product = productDetails[item.variantId];
                const variants = variant[item.variantId];
        
                if (!product || !variants) {
                    console.warn(`Product or variant not found for variant ID: ${item.variantId}`);
                    return null; 
                }
        
                const colorName = variants?.color?.name || 'N/A';  
                const sizeName = variants?.size?.name || 'N/A'; 
                const salePrice = variants?.salePrice || 0;      
                return {
                    quantity: item.variantQuantity,
                    productId: product._id,  
                    color: colorName,
                    size: sizeName,
                    price: salePrice,
                    variantQuantity: item.variantQuantity,
                };
            }).filter(item => item !== null),  
            total: amountTotal  ,
            voucher:voucherCode,
            name: userName,
            phone: phone,
            address: address,
            payment:paymentt,
        };

        try {
            for (let item of checkedCartItems) {
                const variantId = item.variantId;
                const quantityPurchased = item.variantQuantity;
    
                const product = productDetails[variantId];
                console.log(product, variantId, quantityPurchased);
    
                if (product && product.variant) {
                    const variant = product.variant.find(v => v._id === variantId);
                    if (variant) {
                        const newQuantity = variant.quantity - quantityPurchased;
                        console.log(newQuantity);
                        if (newQuantity < 0) {
                            toast.warning("Số lượng sản phẩm trong kho không đủ!");
                            return;
                        }
    
                        const result = await updateVariantQuantity(variantId, newQuantity);
                        console.log(newQuantity, result);
    
                        if (!result || !result.success) {
                            console.error("Failed to update variant", result?.message || "Unknown error");
                            toast.error(`Không thể cập nhật số lượng cho sản phẩm: ${product.title}`);
                            return;
                        }
                    } else {
                        console.error("Variant not found for ID:", variantId);
                        toast.error(`Không tìm thấy variant cho sản phẩm: ${product.title}`);
                        return;
                    }
                } else {
                    console.error("Product or variants not found for variant ID:", variantId);
                    toast.error(`Không tìm thấy sản phẩm cho variant ID: ${variantId}`);
                    return; 
                }
            }
            const orderResponse = await createOrder(orderDetails);
            console.log('Order created successfully:', orderResponse);
    
            localStorage.removeItem('cart');
            toast.success("Thanh toán thành công.");
            deleteUncheckedItems(userId, uncheckedCartItems); 
            window.location.href = "http://localhost:5173/";
    
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };
    usePaymentStatus({ setischeckOut });

    
    return (
        <>
            {cart.length === 0 ? (
                <p className='w-full text-center mt-7'>Chưa có sản phẩm trong giỏ hàng</p>
            ) : (
                <div className="w-full mt-10">
                    <div className="overflow-x-auto">
                        <table className='table w-full  text-[#666666]'>
                            <thead className='h-[64px]'>
                                <tr>
                                    <th className='border font-normal w-2/5'>Sản phẩm</th>
                                    <th className='border font-normal'>Giá</th>
                                    <th className='border font-normal'>Số lượng</th>
                                    <th className='border font-normal'>Tổng Tiền</th>
                                    <th className='border font-normal'>Thanh toán</th>
                                    <th className='border font-normal'></th>
                                </tr>
                            </thead>
                            <tbody className='text-black'>
                                {cart.map((item,index) => {
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
                                        <tr key={index} className='h-[120px]'>
                                        <td className='border p-4'>
                                            <div className="flex gap-x-4">
                                                <img src={product.images[0]} alt={product.title} className="h-full w-[120px]" />
                                                <div className='xs:hidden sm:hidden md:block'>
                                                    <h2 className='font-bold line-clamp-2'>{product.title}</h2>
                                                    <p className='font-medium text-[18px]'>Màu: <span className='text-[#666666]'>{colorName}</span></p>
                                                    <p className='font-medium text-[18px]'>Size: <span className='text-[#666666]'>{sizeName}</span></p>
                                                </div>
                                            </div>
                                            
                                        </td>
                                        <td className='border p-4 text-center'>{salePrice.toLocaleString()} VNĐ</td>
                                        <td className='border p-4'>
                                        <div className="flex items-center justify-between">
                                            <button 
                                                onClick={() => changeQuantity(item._id, 1)} 
                                                disabled={item.payment === 'Đã thanh toán'} 
                                                className={item.payment === 'Đã thanh toán' ? 'cursor-not-allowed opacity-50' : ''}
                                            >
                                                +
                                            </button>
                                            <span>{item.variantQuantity}</span>
                                            <button 
                                                onClick={() => changeQuantity(item._id, -1)} 
                                                disabled={item.payment === 'Đã thanh toán'} 
                                                className={item.payment === 'Đã thanh toán' ? 'cursor-not-allowed opacity-50' : ''}
                                            >
                                                -
                                            </button>
                                        </div>
                                        </td>
                                        <td className='border p-4 text-center'>{(salePrice * item.variantQuantity).toLocaleString()} VNĐ</td>
                                        <td className='border p-4 text-center'>
                                        <input 
                                            type="checkbox" 
                                            checked={checkedItems.has(item._id)}
                                            onChange={() => handleCheckboxChange(item._id)} 
                                            disabled={item.payment === 'Đã thanh toán'}
                                            className={item.payment === 'Đã thanh toán' ? 'cursor-not-allowed opacity-50' : ''} 
                                        />
                                        </td>
                                        <td className='border text-center p-4'>
                                        <button 
                                            onClick={() => item.payment !== 'Đã thanh toán' && Delete(item._id)} 
                                            aria-label="Remove item"
                                            disabled={item.payment === 'Đã thanh toán'} 
                                            className={item.payment === 'Đã thanh toán' ? 'cursor-not-allowed opacity-50' : ''}
                                        >
                                            <Trash />
                                        </button>
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex gap-4 flex-row-reverse mt-4">
                        <h3>Tổng cộng: {total.toLocaleString()} VNĐ</h3>
                    </div>
                    <div className="flex gap-4 flex-row-reverse mt-2">
                        <ButtonRemoveCart userId={userId} />
                        <button onClick={() => handleCheckout()} className='bg-gray-700 mb-2 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300'>
                            Thanh Toán
                        </button>
                    </div>
                </div>
            )}
            {checkOut && (
            <div className="fixed w-full bg-white top-0 left-0 h-full z-[300] px-20">
                    <div className="w-full flex justify-center"><Logo size={`xs:w-[640px] md:w-[80px] xl:w-[80px]`}/></div>
                    <div className="mt-3">
                        <div className="">
                            <div className="">
                                <form  onSubmit={handleSubmit}>
                                    <div className="flex gap-x-5">
                                        <div className="w-1/5">
                                            <div className="border p-4">
                                                <h2 className="text-black font-semibold text-[17px] mt-2 mb-[20px]">Thông tin giao hàng</h2>
                                                <div className="flex flex-col space-y-4">
                                                    <input type="text" placeholder="Họ và tên" value={userName} onChange={(e) => setUserName(e.target.value)} className="border py-3 px-4" />
                                                    <input type="number" placeholder="SĐT" value={phone} onChange={(e) => setPhone(e.target.value)} className="border py-3 px-4" />
                                                    <input type="text" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} className="border py-3 px-4" />
                                                </div>  
                                            </div>  
                                            <button onClick={() => handleCheckoutClose()} type="button" className="w-full mt-4 px-6 py-3.5 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">Trở lại</button>
                                        </div>
                                        <div className="w-2/5">
                                            <div className="border p-4">
                                            <h2 className="text-black font-semibold text-[17px] mt-2 mb-[20px]">Mua hàng Online</h2>
                                                {cart.some(item => item.payment !== 'Đã thanh toán') && (
                                                    <>
                                                        <div className="">
                                                            <div className="flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    className="w-3 h-3 cursor-pointer"
                                                                    name="ship"
                                                                    value="regular"
                                                                    checked={shippingOption === 'regular'}
                                                                    onChange={() => handleShippingChange('regular')}
                                                                />
                                                                <label htmlFor="regular" className="ml-4 flex gap-2 cursor-pointer">Giao hàng tiêu chuẩn 3-6 ngày</label>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    className="w-3 h-3 cursor-pointer"
                                                                    name="ship"
                                                                    value="express"
                                                                    checked={shippingOption === 'express'}
                                                                    onChange={() => handleShippingChange('express')}
                                                                />
                                                                <label htmlFor="express" className="ml-4 flex gap-2 cursor-pointer">Giao hàng hỏa tốc 1-3 ngày</label>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="border p-4 mt-5">
                                            <h2 className="text-black font-semibold text-[17px] mt-2 mb-[15px] flex justify-between"><span>Phương thức thanh toán</span> <button onClick={handlePopupOpen} type='button'  className='text-sm font-semibold text-slate-400'>Thay đổi</button></h2>
                                                {paymentMethod === "cash" && (
                                                <div className="">
                                                    <h2 className='text-sm font-light'>Trả tiền mặt khi nhận hàng (COD)</h2>  
                                                </div>
                                                )}
                                                {paymentMethod === "momo" && (
                                                <div className="">
                                                    <h2 className='text-sm font-light flex justify-between'>
                                                        <span>Zalopay</span>
                                                         <img className='h-5' src="https://seeklogo.com/images/Z/zalopay-logo-643ADC36A4-seeklogo.com.png" alt="" />
                                                    </h2>  
                                                </div>
                                                )}
                                            {showPaymentPopup && (
                                                <>
                                               {cart.some(item => item.payment !== 'Đã thanh toán') && (
                                                <>
                                                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                                                    <div className="bg-white px-6 pt-6 pb-2 w-[500px] rounded-lg shadow-lg">
                                                        <h2 className="text-black text-lg font-semibold mb-4">Phương thức thanh toán</h2>
                                                        <div className="flex items-center mb-4">
                                                        <input
                                                            type="radio"
                                                            className="w-3 h-3 cursor-pointer"
                                                            name="payment"
                                                            value="cash"
                                                            checked={paymentMethod === "cash"}
                                                            onChange={() => handlePaymentChange("cash")}
                                                        />
                                                        <label htmlFor="cash" className="ml-4 flex gap-2 cursor-pointer">
                                                            Thanh toán khi nhận hàng (COD)
                                                        </label>
                                                        </div>
                                                        <div className="flex items-center mb-4">
                                                        <input
                                                            type="radio"
                                                            className="w-3 h-3 cursor-pointer"
                                                            name="payment"
                                                            value="momo"
                                                            checked={paymentMethod === "momo"}
                                                            onChange={() => handlePaymentChange("momo")}
                                                        />
                                                        <label htmlFor="momo" className="ml-4 flex justify-between items-center cursor-pointer w-full">
                                                            <span>Zalopay </span>
                                                            <img className='h-5' src="https://seeklogo.com/images/Z/zalopay-logo-643ADC36A4-seeklogo.com.png" alt="" />
                                                        </label>
                                                        </div>
                                                        <div className="flex justify-end">
                                                        <button
                                                            onClick={handlePopupClose}
                                                            type="button"
                                                            className="text-sm font-semibold text-slate-400"
                                                        >
                                                            Đóng
                                                        </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </>
                                                )} 
                                                </>
                                            )}
                                            </div>
                                            <div className="border p-4 mt-5 pb-10">
                                            <h2 className="text-black font-semibold text-[17px] mt-2 mb-[20px]">Voucher và Coupon</h2>
                                            {cart.some(item => item.payment !== 'Đã thanh toán') && (
                                                    <>
                                                    <input 
                                                        value={voucherCode}
                                                        onChange={handleVoucherChange} 
                                                        type="text" placeholder="Nhập mã giảm giá (nếu có)" 
                                                        className="border py-3 px-4 w-full" 
                                                        />
                                                    </>
                                                )}
                                            </div>      
                                        </div>
                                        <div className="w-2/5">
                                            <div className="border p-4">
                                                <h2 className="text-black font-semibold text-[17px] mt-2 mb-[20px]">Đơn hàng</h2>
                                                {/* <h2 className="text-4xl font-extrabold text-gray-800">{total.toLocaleString()}</h2> */}
                                                <div className="tt-2 max-h-52 overflow-y-auto ">
                                                    {cart.filter(item => checkedItems.has(item._id)).map((item, index) => {
                                                            const product = productDetails[item.variantId];
                                                            const variants = variant[item.variantId];
                                                            
                                                            
                                                            console.log("checkitem:",product,variants);
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
                                                            return(
                                                                <div key={index} className="flex border-b py-2 w-full">
                                                                    <img src={product.images[0]} alt={product.title} className="h-20 object-cover mr-2" />
                                                                    <div className="flex flex-col w-full">
                                                                        <span className="font-medium line-clamp-2">{product.title}</span>
                                                                        <div className="text-slate-400 text-sm">{colorName},{sizeName}</div>
                                                                        <div className="flex justify-between w-full">
                                                                            <div className="text-sm">Số lượng: {item.variantQuantity}</div>
                                                                            <div className="text-sm">{salePrice.toLocaleString()} VNĐ</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                </div>
                                                <ul className="text-gray-800 mt-8 space-y-4">
                                                    <li className="flex flex-wrap gap-4 text-sm">Tổng tiền sản phẩm <span className="ml-auto font-bold">{total.toLocaleString()} VND</span></li>
                                                    <li className="flex flex-wrap gap-4 text-sm">Phí ship <span className="ml-auto font-bold">{shippingFee.toLocaleString()} VND</span></li>
                                                    <li className="flex flex-wrap gap-4 text-sm">Giảm giá <span className="ml-auto font-bold">-{discount.toLocaleString()}%</span></li>
                                                    <li className="flex flex-wrap gap-4 text-sm">Thuế <span className="ml-auto font-bold">0%</span></li>
                                                    {cart.some(item => item.payment === 'Thanh toán khi nhận hàng') && (
                                                        <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                                                            Tổng thanh toán <span className="ml-auto">{(shippingFee + total - (total * discount/100)).toLocaleString()} VND</span>
                                                        </li>
                                                    )}
                                                    {cart.some(item => item.payment === 'Đã thanh toán') && (
                                                        <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                                                            Tổng thanh toán <span className="ml-auto"><del>{(shippingFee + total - (total * discount/100)).toLocaleString()} VND</del></span>
                                                        </li>
                                                    )}
                                                </ul>
                                                <div className="flex items-center mt-8">
                                                        <input id="remember-me" onChange={handleCheckboxChangeDK} name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                                        <label htmlFor="remember-me" className="ml-3 block text-sm">
                                                            Tôi chấp nhận <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1"><Link to={'/supports?label=Hỗ%20trợ'}>Các điều khoản và Điều kiện</Link></a>
                                                        </label>
                                                </div>
                                                <div className="flex flex-wrap gap-4 mt-4">                               
                                                    {paymentMethod === "cash" && (
                                                    <button
                                                        type="submit"
                                                        disabled={!isAgreed}
                                                        className="w-full px-6 py-3.5 text-sm bg-gray-800 text-white rounded-md hover:bg-[#111]"
                                                    >
                                                        Đặt hàng
                                                    </button>
                                                    )}
                                                    {paymentMethod === "momo" && (
                                                    <button
                                                        type='button'
                                                        disabled={!isAgreed}
                                                        onClick={handlePayment}
                                                        className="w-full px-6 py-3.5 text-sm bg-gray-800 text-white rounded-md hover:bg-[#111]"
                                                    >
                                                        Thanh toán
                                                    </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
            </div>
        )}
    </>
    );
};

export default Cart;
