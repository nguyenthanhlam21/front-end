import React, { useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import useComment from '../../../hook/useComment';
import useAccount from '../../../hook/useAccount';
import useProduct from '../../../hook/useProduct';

// Hàm chuẩn hóa chuỗi: bỏ dấu và chuyển về chữ thường
const normalizeString = (str) => {
  return str
    .normalize("NFD") // Phân rã dấu
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .toLowerCase(); // Chuyển thành chữ thường
};

const ListComment = () => {
  const { darkMode } = useTheme('');
  const { commentxs, updateComment } = useComment('');
  const { account } = useAccount('');
  const { products } = useProduct('');

  const [filterEmail, setFilterEmail] = useState('');
  const [filterProduct, setFilterProduct] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterShow, setFilterShow] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const toggleCommentVisibility = async (commentId, currentState) => {
    const newState = currentState === 'Hidden' ? 'Show' : 'Hidden';
    try {
      await updateComment(commentId, { show: newState }); 
      console.log(`Comment ${commentId} is now ${newState}.`);
    } catch (error) {
      console.error('Failed to toggle comment visibility:', error);
    }
  };

  const filteredComments = commentxs.filter((comment) => {
    // Lọc theo email người dùng
    if (filterEmail) {
      const user = account.find(u => normalizeString(u.email).includes(normalizeString(filterEmail)));
      if (!user || !comment.userId.includes(user._id)) {
        return false;
      }
    }

    // Lọc theo tên sản phẩm
    if (filterProduct && !comment.productIds.some((productId) => {
      const product = products.find(p => p._id === productId);
      return product && normalizeString(product.title).includes(normalizeString(filterProduct));
    })) {
      return false;
    }

    // Lọc theo trạng thái
    if (filterStatus && comment.stt !== filterStatus) {
      return false;
    }

    // Lọc theo ẩn / hiện
    if (filterShow && comment.show !== filterShow) {
      return false;
    }

    // Lọc theo ngày bình luận (nếu có ngày bắt đầu và kết thúc)
    if (startDate || endDate) {
      const commentDate = new Date(comment.createdAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      if (start && commentDate < start) {
        return false;
      }

      if (end && commentDate > end) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
        <div className="flex justify-between">
          <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Lọc bình luận</h2>
        </div> 

        <div className="mb-4 flex gap-x-4">
          {/* Lọc theo email người dùng */}
          <div className="mb-2 flex flex-col">
            <label htmlFor="emailFilter" className="text-sm font-semibold">Người dùng:</label>
            <input
              id="emailFilter"
              type="text"
              className="border p-2 rounded mt-1 w-full sm:w-auto"
              placeholder="Lọc theo email người dùng"
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
          </div>

          {/* Lọc theo tên sản phẩm */}
          <div className="mb-2 flex flex-col">
            <label htmlFor="productFilter" className="text-sm font-semibold">Tên sản phẩm:</label>
            <input
              id="productFilter"
              type="text"
              className="border p-2 rounded mt-1 w-full sm:w-auto"
              placeholder="Lọc theo tên sản phẩm"
              value={filterProduct}
              onChange={(e) => setFilterProduct(e.target.value)}
            />
          </div>

          {/* Lọc theo trạng thái */}
          <div className="mb-2 flex flex-col">
            <label htmlFor="statusFilter" className="text-sm font-semibold">Trạng thái:</label>
            <select
              id="statusFilter"
              className="border p-2 rounded mt-1 w-full sm:w-auto"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Lọc theo trạng thái</option>
              <option value="Đã mua hàng">Đã mua hàng</option>
              <option value="Chưa mua hàng">Chưa mua hàng</option>
            </select>
          </div>

          {/* Lọc theo ẩn / hiện */}
          <div className="mb-2 flex flex-col">
            <label htmlFor="showFilter" className="text-sm font-semibold">Ẩn / Hiện:</label>
            <select
              id="showFilter"
              className="border p-2 rounded mt-1 w-full sm:w-auto"
              value={filterShow}
              onChange={(e) => setFilterShow(e.target.value)}
            >
              <option value="">Lọc theo ẩn / hiện</option>
              <option value="Show">Hiện</option>
              <option value="Hidden">Ẩn</option>
            </select>
          </div>
        </div>
        {/* Lọc theo ngày bình luận */}
        <div className="mb-4">
            <label className="text-sm font-semibold">Ngày bình luận:</label>
            <div className="flex flex-wrap gap-2 mt-1">
              <input
                type="date"
                className="border p-2 rounded w-full sm:w-auto"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="mx-2 self-center">đến</span>
              <input
                type="date"
                className="border p-2 rounded w-full sm:w-auto"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
      </div>

      <div className="pb-10">
        <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
          <div className="flex justify-between">
            <h2 className={`${darkMode ? 'text-white' : 'text-black'} text-xl font-semibold mb-4`}>
              Danh sách đơn hàng
            </h2>
          </div>

          

          <table className="min-w-full mt-4">
            <thead>
              <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                <th className="py-2 px-4 text-left">STT</th>
                <th className="py-2 px-4 text-left">Tên sản phẩm</th>
                <th className="py-2 px-4 text-left">Email người dùng</th>
                <th className="py-2 px-4 text-left">Bình luận</th>
                <th className="py-2 px-4 text-left">Đánh giá</th>
                <th className="py-2 px-4 text-left">Trạng thái</th>
                <th className="py-2 px-4 text-left">Ẩn / hiện</th>
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {filteredComments?.map((comment, index) => (
                <React.Fragment key={index}>
                  {comment.productIds.map((productId, subIndex) => {
                    const product = products.find(p => p._id === productId);
                    const user = account.find(a => a._id === comment.userId);
                    return (
                      <tr
                        key={`${index}-${subIndex}`}
                        className={`${darkMode ? 'bg-[#2A323D] text-meta-3' : 'bg-white text-black'}`}
                      >
                        <td className="border-b py-2 px-4">
                          {subIndex === 0 ? index + 1 : `${index + 1}.${subIndex + 1}`}
                        </td>
                        <td className="border-b py-2 px-4">{product?.title || 'N/A'}</td>
                        <td className="border-b py-2 px-4">{user?.email || 'N/A'}</td>
                        <td className="border-b py-2 px-4">{comment?.content}</td>
                        <td className="border-b py-2 px-4">{comment?.star}</td>
                        <td className="border-b py-2 px-4">{comment?.stt || 'Chưa mua hàng'}</td>
                        <td className="border-b py-2 px-4">{comment?.show}</td>
                        <td className="border-b py-2 px-4">
                          <button
                            className={`${
                              comment?.show === 'Hidden' ? 'bg-green-500' : 'bg-red-500'
                            } text-white px-3 py-1 rounded`}
                            onClick={() => toggleCommentVisibility(comment._id, comment?.show)}
                          >
                            {comment?.show === 'Hidden' ? 'Hiện bình luận' : 'Ẩn bình luận'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListComment;
