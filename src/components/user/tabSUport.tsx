import React from 'react'
import BadgeCheckSVG from '../../svg/badgeCheckSVG'
import PhoneSVG from '../../svg/phoneSVG'
import TruckSVG from '../../svg/truckSVG'
import SecuritySVG from '../../svg/securitySVG'

const menuSupport = [
    {
        icon:(<SecuritySVG/>),
        title:"Mua sắm an toàn",
        sub:"Bảm đảm an toàn khi mua",
    },
    {
        icon:(<PhoneSVG/>),
        title:"HỖ TRỢ 24/7",
        sub:"Tư vấn trực tuyến",
    },
    {
        icon:(<BadgeCheckSVG/>),
        title:"5 NGÀY HOÀN TRẢ",
        sub:"Đảm bảo hoàn lại tiền",
    },
    {
        icon:(<TruckSVG/>),
        title:"MIỄN PHÍ GIAO HÀNG",
        sub:"Đơn hàng từ 600.000",
    },
    
]

const tabSUport = () => {
  return (
    <>
    <div className="w-full p-2 my-6 bg-[#F6F6F6] xs:hidden sm:hidden md:flex xl:flex justify-between items-center">
        {menuSupport.map((menu, index) => (
            <div key={index} className="flex gap-x-3">
                <div className="">{menu.icon}</div>
                <div className="xs:hidden sm:hidden md:block xl:block items-center">
                    <h2 className='uppercase font-medium'>{menu.title}</h2>
                    <p className="xs:hidden md:hidden xl:block">{menu.sub}</p>
                </div>
            </div>
        ))}
    </div>
    </>
  )
}

export default tabSUport