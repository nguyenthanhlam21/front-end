import React from 'react';

const LogoBrand = ({ img }) => {
    return (
        <div className="w-[170px] h-[170px] p-6 overflow-hidden ">
            <div className="border border-black w-full flex justify-center items-center h-full">
                <img
                    src={img}
                    alt="Logo"
                    className=" object-cover"
                />
            </div>
        </div>
    );
};

export default LogoBrand;
