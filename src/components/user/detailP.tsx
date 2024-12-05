import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from "@material-tailwind/react";
import { TPproducts } from '../../types/products';
import useColor from '../../hook/useColor';
import useSize from '../../hook/useSize';
import useAddToCart from '../../hook/useCart';
import { Cart } from '../../types/cart';
import { toast } from 'react-toastify';
import useComments from '../../hook/useComment';


type Props = {
    product: TPproducts;
  };

const DetailP: React.FC<Props> = ({product}) => {
    const { id } = useParams();
    console.log("ok:",product);
    const [currentImage, setCurrentImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [count, setCount] = useState(0);
    const [activeButton, setActiveButton] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const { size,loadingSize } = useSize();
    const { color,loadingColor } = useColor();
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [availablePrice, setAvailablePrice] = useState('');
    const [availableId, setAvailableId] = useState('');
    const { addToCart, loading, error,cart } = useAddToCart();
    const {createComment, comment,getCommentByProductId} = useComments();
    const [reviewContent, setReviewContent] = useState("");
    const [starRating, setStarRating] = useState(0);

    console.log(cart);
    
    useEffect(() => {
        console.log('Product ID changed, fetching comments...');
        if (id) {
            getCommentByProductId(id);
        }
    }, [id]);
    console.log(comment);
    
    
    
    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setCurrentImage(product.images[0]);
        }
    }, [product]);

    const handleImageClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleClick = (index) => {
        setActiveButton(index);
    };

    const handleIncrement = () => count < availableQuantity && setCount(count + 1);
    const handleDecrement = () => count > 1 && setCount(count - 1);

    const handleChange = (event) => {
        setSelectedSize(event.target.value);
    };
    
    const handleChangeColor = (event) => {
        setSelectedColor(event.target.value);
    };

    const generateRandomId = () => {
        return 'cart-' + Math.random().toString(36).substr(2, 9);
    };
    
    useEffect(() => {
        if (product?.variant && selectedSize && selectedColor) {
            const selectedVariant = product.variant.find(variant =>
                variant.size.toString() === selectedSize && variant.color.toString() === selectedColor
            );
            setAvailableQuantity(selectedVariant ? selectedVariant.quantity : 0);
            setAvailablePrice(selectedVariant ? selectedVariant.salePrice : product.price);
            setAvailableId(selectedVariant ? selectedVariant._id :"");
        }
    }, [selectedSize, selectedColor, product]);
    
    
    const handleAddToCart = async  () => {
        const paymentt = cart.map(item => item.payment);
        console.log("123123",paymentt);
        if (count <= 0) {
            toast.warning("Số lượng sản phẩm ko được nhỏ hơn 1.");
            return;
        }
        else if (!selectedSize) {
            toast.warning("Vui lòng chọn kích cỡ.");
            return;
        }
        else if (!selectedColor) {
            toast.warning("Vui lòng chọn màu sắc.");
            return;
        }
        else if (paymentt.includes("Đã thanh toán")) {
            toast.warning("Bạn còn đơn hàng chưa xác nhận đặt hàng!");
            return;
        }else{
            const userid = JSON.parse(localStorage.getItem("user"))?._id;
            console.log(id);
            
            const cartItem: Cart = {
                user: userid,
                variantId: availableId,
                variantQuantity: count,
            };       
            await addToCart(cartItem);
            toast.success("Thêm sản phẩm thành công!");
            window.location.reload();
        }
    }
    
    
    if (!product) {
        return <div>Không tìm thấy sản phẩm.</div>;
    }
    
    const getColorNameById = (id) => color.find(item => item._id === id)?.name;
    const getSizeNameById = (id) => size.find(item => item._id === id)?.name;

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        try {
            const userid = JSON.parse(localStorage.getItem("user"))?._id;
            const productIds = [product._id]; 
            const content = reviewContent;
            const star = starRating;
            const userId = userid; 
            console.log(star)
            if (!content.trim()) {
                toast.warning("Vui lòng nhập nội dung đánh giá.");
                return;
            }
      
            await createComment({
                productIds,
                userId,
                content,
                star,
            });
            setReviewContent('');
            toast.success("Cảm ơn bạn đá nhận xét!");
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Gửi đánh giá thất bại, vui lòng thử lại sau.");
        }
      };
      
    
    return (
        <>
            <div className="font-sans bg-white mt-16 mb-10">
                <div className=" lg:max-w-7xl max-w-4xl mx-auto">
                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 ">
                    <div className="lg:col-span-3 flex w-full lg:sticky top-0 text-center">
                    <div className="flex flex-col gap-y-6 mr-4">
                            {product.images.length > 0 ? (
                                product.images.map((img, index) => (
                                    <div key={index} className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer" onClick={() => setCurrentImage(img)}>
                                        <img src={img} alt={`Product image ${index + 1}`} className="w-full" />
                                    </div>
                                ))
                            ) : (
                                <div className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                    <img src="https://via.placeholder.com/150" alt="No images available" className="w-full" />
                                </div>
                            )}
                        </div>
                        <div className="px-4 py-10 w-full h- rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                            <img src={currentImage} alt="Product" className="w-3/4 rounded object-cover mx-auto" onClick={handleImageClick} />
                            {isOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleClose}>
                                <img 
                                    src={currentImage} 
                                    alt="Product" 
                                    className="max-h-screen max-w-full object-contain" 
                                />
                                </div>
                            )}
                            <button type="button" className="absolute top-4 right-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#ccc" className="mr-1 hover:fill-[#333]" viewBox="0 0 64 64">
                                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                                </svg>
                            </button>
                        </div>
                    </div>


                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-extrabold text-gray-800">{product.title}</h2>
                            <div className="text-2xl text-[#E5E5E5]">__________</div>
                            <div className="text-[#FF6634] font-bold text-[1.5em] py-3">{availablePrice.toLocaleString() || product.price.toLocaleString()} VNĐ</div>
                            <div className="leading-[1.6] font-bold">Hàng xách tay Nhật, Fullbox, Cam kết 100% chính hãng, Phát hiện hàng giả xin đền 10 lần tiền. </div>
                            <div className="leading-[1.6] font-bold py-6">Miễn phí đổi size | đổi mẫu trong 1 tuần !!!</div>
                            <div className="flex">
                                <span className='mr-2 font-semibold'>Kích cỡ:</span>
                                {selectedSize && <h2>{getSizeNameById(selectedSize)}</h2>}
                            </div>
                            <div className="flex gap-x-2 my-2">
                            {size.map((item) => (
                                <div key={item._id} className="relative w-9 h-9">
                                    <input
                                        type="radio"
                                        className="w-9 h-9 absolute appearance-none border  checked:border-gray-300 border-black checked:border-[3px] rounded-sm cursor-pointer z-10"
                                        value={item._id}
                                        name="size"
                                        onChange={handleChange}
                                    />
                                    <label className="w-9 h-9 flex justify-center items-center relative">
                                        {item.name}
                                    </label>
                                </div>
                            ))}
                            </div>
                            <div className="flex">
                                <span className='mr-2 font-semibold'>Màu:</span>
                                {selectedColor && <h2>{getColorNameById(selectedColor)}</h2>}
                            </div>
                            <div className="flex gap-x-2 my-2">
                            {color.map((item) => (
                                <div key={item._id} className="relative w-9 h-9">
                                    <input
                                        type="radio"
                                        style={{ backgroundColor: item.colorCode }}
                                        className={`w-6 h-6 absolute appearance-none border rounded-full border-gray-300 checked:border-black checked:border-[3px] cursor-pointer z-10`}
                                        value={item._id}
                                        name="color"
                                        onChange={handleChangeColor}
                                    />
                                </div>
                            ))}
                            </div>
                            <div className="border-dashed border-t mt-8 pt-6 flex gap-x-6">
                                <div className="">
                                    <div className="flex items-center w-28 justify-between border">
                                        <button 
                                            className="bg-[#F9F9F9] boder p-2 "
                                            onClick={handleDecrement}
                                        >
                                            -
                                        </button>
                                        <span className="text-xl  px-6">{count}</span>
                                        <button 
                                            className="bg-[#F9F9F9] border p-2 "
                                            onClick={handleIncrement}
                                        >
                                            +
                                        </button> 
                                    </div>
                                </div>
                                <button  onClick={handleAddToCart} className='uppercase bg-[#FF6633] text-white font-bold text-[18px] px-4 py-2'>thêm vào giỏ hàng</button>
                            </div>
                            <div className="pb-6 text-xs mt-1">Số lượng có sẵn: {availableQuantity}</div>
                            <div className="border-dashed border-t py-2"><span>Mã:</span> {product._id}</div>
                            <div className="border-dashed border-t py-2"><span>Danh mục:</span> {product.category.name}</div>
                            <div className="border-dashed border-t py-2"><span>Thương hiệu:</span> {product.brand.name}</div>
                        </div>
                    </div>
                    <div className="border-t flex gap-x-4 mt-28">
                        <div>
                            <button
                                className={`font-medium text-[14px] inline border-t-4 ${activeButton === 0 ? 'border-[#FF6633]' : 'border-transparent'}`}
                                onClick={() => handleClick(0)}
                            >
                                Mô tả 
                            </button>
                        </div>
                        <div>
                            <button
                                className={`font-medium text-[14px] inline border-t-4 ${activeButton === 1 ? 'border-[#FF6633]' : 'border-transparent'}`}
                                onClick={() => handleClick(1)}
                            >
                                Đánh giá
                            </button>
                        </div>
                    </div>
                    {activeButton === 0 && (
                        <div className="mt-10">
                            <h3 className="text-xl font-bold text-gray-800">Mô tả</h3>
                            <p className='text-base leading-6 text-gray-700 mt-4'><div dangerouslySetInnerHTML={{ __html: product?.description }} /></p>
                            <img className='h-[500px] w-auto mt-5' src={product.img_des} alt="none" />
                        </div>
                    )}
                    {activeButton === 1 && (
                        <div className="mt-10">
                            <h3 className="text-xl font-bold text-gray-800">Bình luận</h3>
                            {comment.length === 0 ? (
                                <p className="mt-2">Chưa có bình luận nào.</p>
                            ) : (
                                <div className="mt-6 overflow-y-auto max-h-[500px]">
                                    {comment
                                    .filter(item => item.show === 'show')  
                                    .map((item) => (
                                        <div className=" mx-auto border px-6 py-4 rounded-lg mb-2">
                                            <div className="flex justify-between">
                                                <div className="flex items-center mb-6">
                                                    <img src="https://media.istockphoto.com/id/951316004/de/vektor/benutzer-symbol-vektor-m%C3%A4nnliche-person-symbol-profil-kreis-avatar-zeichen-in-flache-farbe.jpg?s=612x612&w=0&k=20&c=yGetU5odhmf4jZa-Oh3U-GOsbtoo_qETyoQC4FOdqm0=" alt="Avatar" className="w-12 h-12 rounded-full mr-4"></img>
                                                    <div>
                                                        <div className="text-lg font-medium text-gray-800 flex gap-x-2">
                                                            <div className="">{item.userId?.name ? item.userId.name : `Người dùng ${item.userId._id}`}</div>
                                                            <Rating value={item.star} readonly   unratedColor="amber" ratedColor="amber" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                                        </div>
                                                        <div className="text-gray-500">
                                                            {new Date(item.createdAt).toLocaleString('vi-VN', {
                                                                weekday: 'short', 
                                                                year: 'numeric',
                                                                month: 'numeric',
                                                                day: 'numeric',
                                                                hour: 'numeric',
                                                                minute: 'numeric',
                                                                second: 'numeric'
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-2">
                                                    {item.stt}
                                                </div>
                                            </div>
                                            <p className="text-lg leading-relaxed mb-6">{item.content}.</p>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <a href="#" className="text-gray-500 hover:text-gray-700 mr-4"><i className="far fa-thumbs-up"></i> Like</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <form onSubmit={handleReviewSubmit}>
                                <div className="mt-6 w-full border-2 py-4 px-6 border-[#FF6633]">
                                    <h2 className='font-bold text-[20px] line-clamp-1'>Bình luận sản phẩm </h2>
                                    <h2 className='mt-2 mb-2 font-medium'>Đánh giá của bạn <span className='text-red-600 font-bold'>*</span></h2>
                                    <Rating value={starRating} onChange={(newRating) => setStarRating(newRating)} unratedColor="amber" ratedColor="amber" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                    <h2 className='mt-4 font-medium'>Nhận xét của bạn <span className='text-red-600 font-bold'>*</span></h2>
                                    <textarea 
                                        value={reviewContent}
                                        onChange={(e) => setReviewContent(e.target.value)} 
                                        className='w-full mt-1 p-2 h-[200px] border shadow-lg' id="">
                                    </textarea>
                                    <p className='mt-4 font-medium text-red-600'>Lưu Ý: * là những ô bắt buộc phải nhập.</p>
                                    <button className='uppercase mt-4 mb-12 py-2 px-4 border bg-[#FF6633] font-bold text-white'>Gửi đi</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default DetailP;
