import React from 'react';

type Props = {
    onReset: () => void;
}

const ButtonReset = ({ onReset }: Props) => {
    return (
        <button 
            className="bg-[#FF6633] w-[86px] h-[38px] font-bold text-[1em] tracking-[0.03em] text-white px-[18px] "
            onClick={onReset}
        >
            RESET
        </button>
    );
}

export default ButtonReset;
