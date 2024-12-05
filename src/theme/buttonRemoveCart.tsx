// import React from 'react';
// import useCart from '../hook/useCart';

// type Props = {
//     setCartItems: (items: any[]) => void;
// };

// const ButtonRemoveCart: React.FC<Props> = ({ userId,style }) => {
//     const {DeleteAll,cart } = useCart();
//     const removeCart = () => {
//         DeleteAll(userId)
//     };
//     console.log("ưqeqweqwewq",cart);
//     return (
//         <button 
//             onClick={removeCart} 
//             className={`bg-red-500 mb-2 text-white font-bold  py-2 px-4 rounded hover:bg-red-700 transition duration-300 ${style}`}
//         >
//             Xóa Giỏ Hàng
//         </button>
//     );
// };

// export default ButtonRemoveCart;


import React from 'react';
import useCart from '../hook/useCart';

type Props = {
    userId: string;
    style?: string;
};

const ButtonRemoveCart: React.FC<Props> = ({ userId, style }) => {
    const { DeleteAll, cart } = useCart();
    const isDisabled = cart.some(item => item.payment === "Đã thanh toán");

    const removeCart = () => {
        if (!isDisabled) {
            DeleteAll(userId);
        }
    };

    console.log("Cart details:", cart);

    return (
        <button
            onClick={removeCart}
            disabled={isDisabled}
            className={`bg-red-500 mb-2 text-white font-bold py-2 px-4 rounded transition duration-300 ${
                isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
            } ${style}`}
        >
            Xóa Giỏ Hàng
        </button>
    );
};

export default ButtonRemoveCart;
