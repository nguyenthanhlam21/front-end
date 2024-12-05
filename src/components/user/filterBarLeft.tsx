import React, { FC, useState } from 'react'
import FilterProduct from './filterProduct'

type Props = {
    toggleOBL: () => void;
};

const filterBarLeft: FC<Props> = ({ toggleOBL }) => {
    const [isOprnBarLeft, setOprnBarLeft] = useState(true);

    const closeOPL = () => {
        setOprnBarLeft(!isOprnBarLeft);
        toggleOBL();
    };
    return (
    <>
        <div className={`fixed top-0 left-0 w-full h-full z-50 ${isOprnBarLeft ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-60" />
            <div className="h-full pb-10 overflow-y-auto px-4 w-[260px] bg-[rgba(255,255,255)] pt-[50px] relative z-10">
                <FilterProduct/>
            </div>
            <button onClick={closeOPL} className="absolute top-2 right-3 text-[24px] text-white">X</button>
        </div>
    </>
  )
}

export default filterBarLeft