import Slider from "react-slick"; 

const menuBanner = [
  {
    img: "https://sneakernews.com/wp-content/uploads/2015/01/kd-7-all-star-shoes-1.jpg",
    main:"sport zoom",
    sub:"đôi giày huyền thoại",
    text:"Gác lại mọi nỗi lo, tiếp bước bàn chân Việt. Mẫu giày đang làm mưa làm gió trên thị trường",
  },
  {
    img: "https://it.kicksmaniac.com/zdjecia/zdjecia/2014/11/25/NIKE_KD_VII_CAVE_PURPLE_GS_GRADE_SCHOOL__669942-500-mini.jpg",
    main:"nâng niu",
    sub:"bàn chân việt",
    text:"Mẫu giày thể thao đang làm mưa làm gió trên thị trường. Giúp cho bạn có một trải nghiệm thoải mái nhất !",
  },
];

const BannerComponent = () => {
  const CustomPrevArrow = () => (<button className="custom-prev-arrow">&#10094;</button>);
  const CustomNextArrow = () => (<button className="custom-next-arrow">&#10095;</button>);
  
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  
  return (
    <>
      {menuBanner.length > 0 && (
        <Slider {...settings}>
          {menuBanner.map((banner, index) => (
            <div className={`w-full relative`}>
              <div className={`flex item justify-end bg-[#B8B8B8]`}>
                <img
                  key={index}
                  className={`w-[auto] bg-[${banner.color}] h-[700px] transform scale-x-[-1]  mix-blend-darken`}
                  src={`${banner.img}`}
                />
              </div>
              <div className="absolute left-[15%] top-1/4">
                <div className="p-5 text-white text-left w-[500px]">
                  <h1 className="text-5xl font-bold uppercase">{banner.main}</h1>
                  <h2 className="text-3xl mt-2 font-light capitalize">{banner.sub}</h2>
                  <p className="text-lg font-extralight mt-3">{banner.text}</p>
                  <button className="border mt-5 hover:bg-white hover:text-black border-white-1 p-4 text-xl font-semibold">XEM CHI TIẾT</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};

export default BannerComponent;
