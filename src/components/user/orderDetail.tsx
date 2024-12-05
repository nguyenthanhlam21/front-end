import { useNavigate, useParams } from 'react-router-dom';
import { useState} from 'react';
import useOrder from '../../hook/useOder';
import useVariant from '../../hook/useVariant';
import useProduct from '../../hook/useProduct';
import useVoucher from '../../hook/useVoucher';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useComments from '../../hook/useComment';
import { Rating } from '@material-tailwind/react';


const OrderDetail = () => {
    const { orderDT, loadingOrder,updateOrderById,errors } = useOrder();
    const { getProductByVariantId,getOneProduct,product } = useProduct();
    const { getOne, variant } = useVariant();
    const { voucher } = useVoucher();
    const [validVoucher, setValidVoucher] = useState(null);
    const [showReview, setShowReview] = useState(false);
    const {createComment} = useComments();
    const [productIds, setProductIds] = useState([]);
    const [reviewContent, setReviewContent] = useState("");
    const [products, setProducts] = useState<{ [key: string]: any }>({});
    const [starRating, setStarRating] = useState(0);
    console.log(errors)
    useEffect(() => {
      const code = orderDT?.voucher;
      const foundVoucher = voucher.find(v => v.code === code); 
      setValidVoucher(foundVoucher); 
    }, [orderDT, voucher]);

    useEffect(() => {
      if (orderDT && orderDT.orderItems) {
        orderDT.orderItems.forEach(item => {
          if (!products[item.productId]) {
            getOneProduct(item.productId);
          }
        });
      }
    }, [orderDT, products, getOneProduct]);
    

    useEffect(() => {
      if (product) {
        setProducts(prev => ({
          ...prev,
          [product._id]: product, 
        }));
      }
    }, [product]);

    const calculateTotalAmount = () => {
      if (!orderDT?.orderItems) return 0; 
      return orderDT.orderItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    };
    
  const totalAmount = calculateTotalAmount();

  const stt = orderDT?.orderStatus;
    const handleUpdateOrderStatus = async (newStatus) => {
      const updatedData = {
          user: orderDT?.user,
          orderCode: orderDT?.orderCode,
          orderStatus: newStatus,
          name: orderDT?.name,
          address: orderDT?.address,
          phone: orderDT?.phone,
      };
      console.log(stt);
      try {
        if(errors){
          toast.warning("Bạn Không thể hủy đơn hàng đã xác nhận.");
          return;
        }else{
        if(stt !== "Chờ xử lý" && newStatus === "Chờ xác nhận hủy đơn hàng"){
          toast.warning("Bạn Không thể hủy đơn hàng đã xác nhận.");
        }else{
        await updateOrderById(orderDT._id, updatedData); 
        toast.warning(`${newStatus === "Chờ xác nhận hủy đơn hàng" ? "Bạn cần chờ để chúng tôi hủy đơn hàng" : "Cám ơn bạn đã mua hàng <3"}`);
        }
      }
        
      } catch (error) {
          console.error("Error updating order status:", error); 
      }
  };
    
    const navigate = useNavigate(); 
    const handleGoBack = () => {
        navigate(-1); 
    };

  useEffect(() => {
    fetchProductDetails();
    orderDT?.orderItems.forEach(item => {
        if (item.variantId) {
            getOne(item.variantId);
        }
    });
}, [orderDT]);

const fetchProductDetails = async () => {
  await Promise.all(orderDT.orderItems.map(item => {
      if (item.variantId) {
          return getProductByVariantId(item.variantId);
      }
  }));
};

const extractProductIds = async () => {
  if (!orderDT?.orderItems) return [];
  const productIds = await Promise.all(
      orderDT.orderItems.map(async (item) => {
          if (item.variantId) {
              const product = await getProductByVariantId(item.variantId);
              return product?._id;
          }
          return null;
      })
  );
  return [...new Set(productIds.filter((id) => id !== null))];
};


useEffect(() => {
  const fetchProductIds = async () => {
      const ids = await extractProductIds();
      setProductIds(ids);
  };
  if (orderDT?.orderItems) {
      fetchProductIds();
  }
}, [orderDT]);

console.log("Product IDs:", productIds,);

const handleReviewSubmit = async (event) => {
  event.preventDefault();
  try {
      const productIds = orderDT?.orderItems
      .map(item => {
        const product = products[item.productId];
        return product ? product._id : null;
      })
      .filter(id => id !== null); 

    if (!productIds.length) {
      toast.warning("Không có sản phẩm để đánh giá.");
      return;
    }
      const content = reviewContent;
      const userId = orderDT?.user; 
      const stt = "Đã mua hàng";
      const star = starRating;
      if (!content.trim()) {
          toast.warning("Vui lòng nhập nội dung đánh giá.");
          return;
      }

      await createComment({
          productIds,
          userId,
          content,
          stt,
          star
      });

      toast.success("Đánh giá của bạn đã được gửi!");
      setShowReview(false);
  } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Gửi đánh giá thất bại, vui lòng thử lại sau.");
  }
};



useEffect(() => {
  fetchProductDetails();
}, [orderDT]);

    return (
        <div className='pb-10'>
            <div>
                <button 
                    onClick={handleGoBack} 
                    className="flex items-center text-gray-500 hover:text-blue-500 transition duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 10l4.293-4.293L10 3.293 2 10l8 6.707 1.586-1.414L7.293 10z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Trở lại
                </button>
            </div>
            <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Mã đơn hàng: {orderDT?.orderCode}<span className="font-semibold"></span></h2>
                <div className="flex ">
                    <div className="w-1/2">
                        <p className="text-gray-600">Tên người nhận: {orderDT?.name}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Số điện thoại: {orderDT?.phone}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Địa chỉ nhận hàng: {orderDT?.address}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Ngày đặt hàng: {orderDT?.createdAt}<span className="font-semibold"></span></p>
                    </div>
                    <div className="w-1/2 ">
                        <p className="text-gray-600">Trạng thái thanh toán: {orderDT?.payment}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Phương thức vận chuyển: {orderDT?.ship || "none"}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Trạng thái giao hàng: {orderDT?.orderStatus}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Voucher: {orderDT?.voucher || "none"}<span className="font-semibold"></span></p>
                    </div>
                </div>
                <h3 className="text-xl font-semibold mt-4">Sản phẩm:</h3>
                <div className="overflow-x-auto">
                        <table className='table w-full mt-4  text-[#666666]'>
                            <thead className='h-[30px]'>
                              <tr>
                                <th className='border font-normal w-2/5'>Sản phẩm</th>
                                <th className='border font-normal'>Giá</th>
                                <th className='border font-normal'>Số lượng</th>
                                <th className='border font-normal'>Tổng Tiền</th>
                              </tr>
                            </thead>
                            <tbody className='text-black'>
                              {orderDT?.orderItems.map((item,index)=>{
                                const productt = products[item.productId];
                                console.log(productt);
                                
                                return (
                                <>
                                {productt ? (
                                  <tr key={index} className='h-[100px]'>
                                    <td className='border p-4'>
                                      <div className="flex gap-x-4">
                                          <img src={productt.images[0]} alt={``} className=" h-[80px]" />
                                          <div className='xs:hidden sm:hidden md:block'>
                                            <h2 className='font-bold line-clamp-2'>{productt.title}</h2>
                                            <p className='font-medium text-[18px]'>Màu: <span className='text-[#666666]'>{item.color}</span></p>
                                            <p className='font-medium text-[18px]'>Size: <span className='text-[#666666]'>{item.size}</span></p>
                                          </div>
                                        </div>
                                    </td>
                                    <td className='border p-4 text-center'>{item.price.toLocaleString()} VNĐ</td>
                                    <td className='border p-4'>
                                      <div className="text-center">
                                        {item.variantQuantity}
                                      </div>
                                    </td>
                                    <td className='border p-4 text-center'>{(item.variantQuantity * item.price).toLocaleString()} VNĐ</td>
                                  </tr>
                                  ) : (
                                  <span>Loading product...</span> 
                                )}
                                </>
                                );
                              })}
                            </tbody>
                        </table>
                </div>
                <div className="font-bold text-lg mt-4">Tổng tiền sản phẩm: <span className='text-red-500'>{totalAmount.toLocaleString()} VNĐ</span></div>
                <div className="font-bold text-lg">
                  Giảm giá: 
                  {validVoucher ? (
                    <span className='text-red-500'> {validVoucher.value} %</span>
                  ) : (
                    <span className='text-red-500'>0 %</span>
                  )}
                </div>
                <div className="font-bold text-lg">Tổng tiền thanh toán: <span className='text-red-500'>{orderDT?.total?.toLocaleString()} VNĐ</span></div>
                
                <div className="mt-6 flex gap-4">
                  {orderDT?.orderStatus === "Chờ xử lý" && (
                    <div className="mt-6 flex gap-4">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded"
                        onClick={() => handleUpdateOrderStatus("Chờ xác nhận hủy đơn hàng")} 
                        disabled={loadingOrder}
                        >Hủy đơn hàng</button>
                    </div>
                    )}
                  {orderDT?.orderStatus === "Giao hàng thành công" && (
                    <div className="mt-6 flex gap-4">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded"
                        onClick={
                          () => {
                            handleUpdateOrderStatus("Đã nhận được hàng");
                            setShowReview(true);
                        }} 
                        disabled={loadingOrder}
                        >Đã nhận được hàng</button>
                    </div>
                  )}
                  {showReview && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <form onSubmit={handleReviewSubmit}>
                            <div className="p-5 rounded w-[500px] bg-white text-black">
                                <h2 className="text-xl">Đánh giá sản phẩm đơn hàng</h2>
                                <Rating value={starRating} onChange={(newRating) => setStarRating(newRating)} unratedColor="amber" ratedColor="amber" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                <textarea
                                    className="mt-2 w-full p-2 border-2"
                                    placeholder="Nhập đánh giá của bạn"
                                    value={reviewContent}
                                    onChange={(e) => setReviewContent(e.target.value)}
                                />
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white px-3 py-1 mr-2"
                                        onClick={() => setShowReview(false)}
                                    >
                                        Trở lại
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-3 py-1 text-white bg-blue-600"
                                    >
                                        Gửi đánh giá
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
