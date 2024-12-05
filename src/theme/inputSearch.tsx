import React from 'react';

type Props = {
    setSearchVisible: (visible: boolean) => void;
};

const InputSearch: React.FC<Props> = ({ setSearchVisible,border,padding,width,rounded,ml }) => {
    return (
        <form action="">
            <input 
                type="search" 
                placeholder="Tìm kiếm..." 
                className={`${border} ${padding} ${width} ${rounded} ${ml}`}
                onBlur={() => setSearchVisible(false)} 
                onFocus={() => setSearchVisible(true)} 
            />
        </form>
    );
};

export default InputSearch;
