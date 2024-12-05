import React from 'react';
import { useParams } from 'react-router-dom';

const menuNewsText = [
    {
        id: "1",
        categoryNews: "sale",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/D%C3%A9p-Puma-Fenty-m%E1%BA%ABu-m%E1%BB%9Bi-nh%E1%BA%A5t-c%E1%BB%A7a-Rihanna-768x576.jpg",
        title: "Dép Puma Fenty mẫu mới nhất của Rihanna",
        date: "22 Tháng Mười, 2019",
        text:(`Trào lưu của giới trẻ thường bất ngờ xuất hiện mà chẳng cần lý do. Một bài hát, một câu nói, thậm chí một chiếc áo… cũng có thể trở thành xu hướng.

Mới đây, ảnh chụp đôi dép nhựa màu xanh, có hình con cá rô phi xuất hiện trên nhiều diễn đàn. Theo đó, đôi dép này đang được nhiều bạn trẻ tìm mua, chụp check-in trên bãi biển. Bởi nó sở hữu vẻ ngoài độc đáo, ấn tượng, thích hợp đi vào mùa hè.

Trào lưu này được cho là xuất phát từ một bức ảnh của cô gái bán hàng online trên mạng vào ngày 15/6. Khoảnh khắc check-in với đôi dép cá chép ở bãi biển nhanh chóng thu hút hơn 100.000 like (thích), được đăng tải kèm dòng chú thích: “Truyền thuyết kể rằng đôi tình nhân nào mà mang đôi dép cá rô phi này sẽ hạnh phúc cả đời”. 

Nguyễn Diễm Hương (25 tuổi, Nha Trang) – người chia sẻ hình dép cá rô phi xanh – tỏ ra bất ngờ khi ảnh của mình trở thành tâm điểm chú ý trên mạng.

“Đôi dép này có từ năm ngoái, mình từng bán được một số lượng dép khá lớn. Năm nay do mùa hè tới nên nhiều người có nhu cầu mua và được nhiều bạn trẻ ưa chuộng bởi thiết kế độc và lạ”, Hương nói.

Diễm Hương cho hay một ngày, cô bán qua mạng được 10 – 20 đôi, hầu hết là các bạn trẻ đặt hàng dùng đi thường ngày hay ra biển. Mẫu này cũng có thiết kế dành cho trẻ em.

Ban đầu, mọi người thường bất ngờ vì giá dép cá rô phi xanh khá đắt, song cũng có bạn mua về khen nó đi rất êm và mềm. Nhiều bạn trẻ tâm sự diện dép cá ra đường khiến họ được chú ý hơn.`)
    },
    {
        id: "2",
        categoryNews: "sale",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Cho%C3%A1ng-ng%E1%BB%A3p-v%E1%BB%9Bi-t%E1%BB%A7-gi%C3%A0y-h%C3%A0ng-tr%C4%83m-%C4%91%C3%B4i-768x576.jpg",
        title: "Choáng ngợp với tủ giày hàng trăm đôi",
        date: "22 Tháng Mười, 2019",
        text: "Văn Mai Hương vốn là một mỹ nhân có niềm đam mê cực lớn với giày dép. Cô từng [...]"
    },
    {
        id: "3",
        categoryNews: "sale",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Ch%E1%BB%8Dn-gi%C3%A0y-d%C3%A9p-l%C3%BAc-n%C3%A0o-c%C5%A9ng-v%E1%BB%ABa-in-ch%C3%A2n-768x576.jpg",
        title: "Chọn giày dép lúc nào cũng vừa in chân",
        date: "22 Tháng Mười, 2019",
        text: "Mũi giày hay gót giày không bị biến dạng quá lâu khi bạn cầm lên và bóp nhẹ [...]"
    },
    {
        id: "4",
        categoryNews: "news",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Th%C3%AAm-5-%C4%91%C3%B4i-sneaker-m%C3%A0u-ng%E1%BB%8Dt-l%E1%BB%8Bm-768x576.jpg",
        title: "Thêm 5 đôi sneaker màu ngọt lịm",
        date: "22 Tháng Mười, 2019",
        text: "Nếu bạn vừa mê sneaker màu hồng lại vừa thích chất liệu da lộn thì phiên bản Gazelle màu Easy [...]"
    },
];

const DetailNews = () => {
    const { id } = useParams();
    const newsItem = menuNewsText.find(item => item.id === id);

    if (!newsItem) {
        return <div>News not found</div>;
    }

    return (
        <>  
        <div className="">
            <h1 className='font-bold text-[28px]'>{newsItem.title}</h1>
            <div className="w-[50px] mt-3 h-1 bg-[#E5E5E5]"></div>
            <p className='uppercase mt-2 text-[.7em] tracking-[.05em]'>{newsItem.date}</p>
            <img className='w-full mt-8' src={newsItem.img} alt={newsItem.title} />
            <p className='mt-6'>{newsItem.text}</p>
            <div className="w-full tex"><div className="w-[50px] mx-auto mt-3 h-1 bg-[#E5E5E5]"></div></div>
        </div>
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                <div className="w-full flex-col justify-start items-start lg:gap-14 gap-7 inline-flex overflow-y-auto h-[500px]">
                    <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">Bình Luận</h2>
                    <div className="w-full flex-col justify-start items-start gap-4 flex">
                        <div
                            className="w-full lg:p-8 p-5 bg-white rounded-3xl border border-gray-200 flex-col justify-start items-start flex">
                            <div className="w-full flex-col justify-start items-start gap-3.5 flex">
                                <div className="w-full justify-between items-center inline-flex">
                                    <div className="justify-start items-center gap-2.5 flex">
                                        <div
                                            className="w-10 h-10 bg-stone-300 rounded-full justify-start items-start gap-2.5 flex">
                                            <img className="rounded-full object-cover" src="https://pagedone.io/asset/uploads/1710225753.png"
                                                alt="John smith image" />
                                        </div>
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <h5 className="text-gray-900 text-sm font-semibold leading-snug">Tú</h5>
                                            <h6 className="text-gray-500 text-xs font-normal leading-5">2 Ngày trước</h6>
                                        </div>
                                    </div>
                                    <div className="group justify-end items-center flex">
                                        <div
                                            className="px-5 py-2.5 rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-400 hover:border-green-600 transition-all duration-700 ease-in-out justify-center items-center flex">
                                            <a href="" className="">
                                                <svg className="group-hover:text-green-600 text-gray-400 group-hover:fill-green-600 fill-white transition-all duration-700 ease-in-out"
                                                    xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    viewBox="0 0 20 20" fill="none">
                                                    <path
                                                        d="M2.62629 3.43257C4.64001 1.44869 7.82082 1.31134 9.99614 3.02053C12.1723 1.31134 15.3589 1.44869 17.3726 3.43257L17.3734 3.43334C19.5412 5.57611 19.5412 9.04382 17.3804 11.1867L17.378 11.1891L10.4631 17.9764C10.2035 18.2312 9.78765 18.2309 9.52844 17.9758L2.62629 11.1821C0.457252 9.04516 0.457252 5.56947 2.62629 3.43257Z"
                                                        stroke="currentColor" />
                                                </svg>
                                            </a>
                                            <div className="px-2 justify-center items-center flex">
                                                <h5
                                                    className="group-hover:text-green-600 text-gray-400 transition-all duration-700 ease-in-out text-base font-semibold leading-relaxed">
                                                    34</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-800 text-sm font-normal leading-snug">Good</p>
                            </div>
                        </div>
                        <div
                            className="w-full lg:p-8 p-5 bg-white rounded-3xl border border-gray-200 flex-col justify-start items-start gap-2.5 flex">
                            <div className="w-full flex-col justify-start items-start gap-3.5 flex">
                                <div className="w-full justify-between items-center inline-flex">
                                    <div className="justify-start items-center gap-2.5 flex">
                                        <div
                                            className="w-10 h-10 bg-stone-300 rounded-full justify-start items-start gap-2.5 flex">
                                            <img className="w-10 h-10 rounded-full object-cover"
                                                src="https://pagedone.io/asset/uploads/1710238051.png"
                                                alt="Emma Davis image" />
                                        </div>
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <h5 className="text-gray-900 text-sm font-semibold leading-snug">Hương</h5>
                                            <h6 className="text-gray-500 text-xs font-normal leading-5">4 Ngày trước</h6>
                                        </div>
                                    </div>
                                    <div className="group justify-end items-center flex">
                                        <div
                                            className="px-5 py-2.5 rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-400 hover:border-green-600 transition-all duration-700 ease-in-out  justify-center items-center flex">
                                            <a href="" className="">
                                                <svg className="group-hover:text-green-600 text-gray-400 group-hover:fill-green-600 fill-white transition-all duration-700 ease-in-out"
                                                    xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    viewBox="0 0 20 20" fill="none">
                                                    <path
                                                        d="M2.62629 3.43257C4.64001 1.44869 7.82082 1.31134 9.99614 3.02053C12.1723 1.31134 15.3589 1.44869 17.3726 3.43257L17.3734 3.43334C19.5412 5.57611 19.5412 9.04382 17.3804 11.1867L17.378 11.1891L10.4631 17.9764C10.2035 18.2312 9.78765 18.2309 9.52844 17.9758L2.62629 11.1821C0.457252 9.04516 0.457252 5.56947 2.62629 3.43257Z"
                                                        stroke="currentColor" />
                                                </svg>
                                            </a>
                                            <div className="px-2 justify-center items-center flex">
                                                <h6
                                                    className="group-hover:text-green-600 text-gray-400 transition-all duration-700 ease-in-out text-base font-semibold leading-relaxed">
                                                    30</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-800 text-sm font-normal leading-snug">Goodd</p>
                            </div>
                        </div>
                        <div
                            className="w-full lg:p-8 p-5 bg-white rounded-3xl border border-gray-200 flex-col justify-start items-start gap-2.5 flex">
                            <div className="w-full flex-col justify-start items-start gap-3.5 flex">
                                <div className="w-full justify-between items-center inline-flex">
                                    <div className="justify-start items-center gap-2.5 flex">
                                        <div
                                            className="w-10 h-10 bg-stone-300 rounded-full justify-start items-start gap-2.5 flex">
                                            <img className="w-10 h-10 rounded-full object-cover"
                                                src="https://pagedone.io/asset/uploads/1710238051.png"
                                                alt="Emma Davis image" />
                                        </div>
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <h5 className="text-gray-900 text-sm font-semibold leading-snug">Thu</h5>
                                            <h6 className="text-gray-500 text-xs font-normal leading-5">4 Ngày trước</h6>
                                        </div>
                                    </div>
                                    <div className="group justify-end items-center flex">
                                        <div
                                            className="px-5 py-2.5 rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-400 hover:border-green-600 transition-all duration-700 ease-in-out  justify-center items-center flex">
                                            <a href="" className="">
                                                <svg className="group-hover:text-green-600 text-gray-400 group-hover:fill-green-600 fill-white transition-all duration-700 ease-in-out"
                                                    xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    viewBox="0 0 20 20" fill="none">
                                                    <path
                                                        d="M2.62629 3.43257C4.64001 1.44869 7.82082 1.31134 9.99614 3.02053C12.1723 1.31134 15.3589 1.44869 17.3726 3.43257L17.3734 3.43334C19.5412 5.57611 19.5412 9.04382 17.3804 11.1867L17.378 11.1891L10.4631 17.9764C10.2035 18.2312 9.78765 18.2309 9.52844 17.9758L2.62629 11.1821C0.457252 9.04516 0.457252 5.56947 2.62629 3.43257Z"
                                                        stroke="currentColor" />
                                                </svg>
                                            </a>
                                            <div className="px-2 justify-center items-center flex">
                                                <h6
                                                    className="group-hover:text-green-600 text-gray-400 transition-all duration-700 ease-in-out text-base font-semibold leading-relaxed">
                                                    30</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-800 text-sm font-normal leading-snug">Goodd</p>
                            </div>
                        </div>    
                    </div>
                    
                </div>
                <div className="w-full relative flex justify-between gap-2">
                        <input type="text"
                            className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed"
                            placeholder="Leave a constructive comment..."/>
                        <a href="" className="absolute right-6 top-[18px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                fill="none">
                                <g clip-path="url(#clip0_2063_2504)">
                                    <path
                                        d="M10.0194 1.66699V5.6556C1.69526 5.6556 1.54178 14.4163 1.69573 18.3337C1.69573 16.4818 5.84659 10.0003 10.0194 10.6414V14.63L18.3332 8.14847L10.0194 1.66699Z"
                                        stroke="#111827" stroke-width="1.6" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2063_2504">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                </div>
            </div>
        </section>
                                            
        </>
    );
};

export default DetailNews;
