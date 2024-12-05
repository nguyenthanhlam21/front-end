import React, { useState } from 'react';
import FilterProduct from '../../components/user/FilterProduct';
import FullProduct from '../../components/user/FullProduct';
import Brand from '../../components/user/Brand';
import SettingSVG from '../../svg/settingSVG';
import FilterBarLeft from '../../components/user/FilterBarLeft';

const AllProduct = () => {
    const [isOpenBarLeft, setOpenBarLeft] = useState(false);
    const [filters, setFilters] = useState({});

    const toggleBarLeft = () => {
        setOpenBarLeft(!isOpenBarLeft);
    };

    const handleApplyFilters = (selectedFilters) => {
        setFilters(selectedFilters);
    };

    return (
        <>
            <button onClick={toggleBarLeft} className="w-full xs:flex md:hidden flex justify-center mt-5 items-center">
                <SettingSVG />
                <span className='mx-1 uppercase font-bold text-xl'>Lọc</span>
            </button>
            <div className="flex mt-7 mb-16">
                <div className="xs:hidden sm:hidden md:block md:w-1/4">
                    <FilterProduct onApplyFilters={handleApplyFilters} />
                </div>
                <div className="xs:w-full sm:w-full md:w-3/4">
                    <FullProduct filters={filters} />
                </div>
            </div>
            <div className="mb-28"><Brand /></div>
            {isOpenBarLeft && <FilterBarLeft toggleOBL={toggleBarLeft} />}
        </>
    );
};

export default AllProduct;
