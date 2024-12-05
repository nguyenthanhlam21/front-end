import React from 'react';
import TitleMainCenter from '../../theme/titleMainCenter';
import BoxNewsText from '../../theme/boxNewsText';
import Slider from "react-slick"; 

const menuNewsText = [
    {
        id: "1",
        categoryNews:"sale",
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
        categoryNews:"sale",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Cho%C3%A1ng-ng%E1%BB%A3p-v%E1%BB%9Bi-t%E1%BB%A7-gi%C3%A0y-h%C3%A0ng-tr%C4%83m-%C4%91%C3%B4i-768x576.jpg",
        title: "Choáng ngợp với tủ giày hàng trăm đôi",
        date: "22 Tháng Mười, 2019",
        text: "Văn Mai Hương vốn là một mỹ nhân có niềm đam mê cực lớn với giày dép. Cô từng [...]"
    },
    {
        id: "3",
        categoryNews:"sale",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Ch%E1%BB%8Dn-gi%C3%A0y-d%C3%A9p-l%C3%BAc-n%C3%A0o-c%C5%A9ng-v%E1%BB%ABa-in-ch%C3%A2n-768x576.jpg",
        title: "Chọn giày dép lúc nào cũng vừa in chân",
        date: "22 Tháng Mười, 2019",
        text: "Mũi giày hay gót giày không bị biến dạng quá lâu khi bạn cầm lên và bóp nhẹ [...]"
    },
    {
        id: "4",
        categoryNews:"news",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Th%C3%AAm-5-%C4%91%C3%B4i-sneaker-m%C3%A0u-ng%E1%BB%8Dt-l%E1%BB%8Bm-768x576.jpg",
        title: "Thêm 5 đôi sneaker màu ngọt lịm",
        date: "22 Tháng Mười, 2019",
        text: "Nếu bạn vừa mê sneaker màu hồng lại vừa thích chất liệu da lộn thì phiên bản Gazelle màu Easy [...]"
    },
];


const NewsText = () => {
    const settings = {
        className: "center",
        centerMode: false, 
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
      };
      
  return (
    <>
      <TitleMainCenter text={`Tin mới nhất`} sub={undefined}/>
      <div className=" slider-container">
      <Slider {...settings}>
      {menuNewsText.map((product) => (
        <div key={product.id} >
            <div className="mx-3"><BoxNewsText categoryNews={product.categoryNews} imgstyle={`w-full h-auto`} h3={`text-lg font-semibold  line-clamp-1`} style={`border bg-[#EAEAEA] border-gray-300  h-[200px] flex`} product={product} /></div>
        </div>
      ))}
      </Slider>
      </div>
    </>
  )
}

export default NewsText;
