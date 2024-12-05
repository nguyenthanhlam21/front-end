import React, { useState } from 'react';
import SearchSVG from '../../svg/searchSVG';
import Logo from '../../theme/logo';
import useProduct from '../../hook/useProduct';
import { Link } from 'react-router-dom';

const normalizeString = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

type Props = {
  onClose: () => void;
}

const Search = ({ onClose }: Props) => {
  const { products, loading } = useProduct();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    if (query) {
      const normalizedQuery = normalizeString(query); 
      const filtered = products.filter(product => {
        const normalizedProductTitle = normalizeString(product.title);
        return normalizedProductTitle.includes(normalizedQuery); 
      });
      setFilteredProducts(filtered); 
    } else {
      setFilteredProducts(products); 
    }
  };

  // Hàm xử lý khi nhấp vào từ khóa gợi ý
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion); // Điền từ khóa vào ô tìm kiếm
    const normalizedQuery = normalizeString(suggestion); 
    const filtered = products.filter(product => {
      const normalizedProductTitle = normalizeString(product.title);
      return normalizedProductTitle.includes(normalizedQuery);
    });
    setFilteredProducts(filtered); 
  };

  return (
    <>
      <div className="fixed top-0 w-full max-h-screen h-full z-[99999] bg-white">
        <div className="w-full bg-white  px-36 flex items-center">
          <div className="w-1/3">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <div className="w-1/3 flex justify-center">
            <Logo size={`xs:w-[50px] md:w-[50px] xl:w-[50px]`} />
          </div>
          <div className="w-1/3"></div>
        </div>

        <div className="h-[530px] w-full px-36 pt-8 scrollable-container">
          {searchTerm && (
            <>
              <h2 className='font-bold text-base'>Từ khóa gợi ý</h2>
              {filteredProducts.length > 0 ? (
                <div className="flex gap-x-3 mt-2 px-2">
                  {filteredProducts.slice(0, 8).map(product => (
                    <div 
                      key={product._id} 
                      className='text-sm border p-1 rounded-full cursor-pointer' 
                      onClick={() => handleSuggestionClick(product.title)}
                    >
                      <button>{product.title}</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-2">Không tìm thấy từ khóa gợi ý</p>
              )}
              
              <h2 className='font-bold text-base mt-14'>Sản phẩm liên quan</h2>
              {filteredProducts.length > 0 ? (
                <div className="mt-2">
                  {filteredProducts.slice(0, 8).map(product => (
                    <a href={`/product/${product._id}?label=Sản%20phẩm`} key={product._id}>
                      <div className="flex gap-x-2 mb-5">
                        <img src={product.images[0]} alt="" className='h-20'/>
                        <div className="flex-col items-center">
                          <h3 className='text-base font-bold mt-2'>{product.title}</h3>
                          <p className='text-xs text-gray-500 mt-1'>Mã sp: {product._id}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-2">Không tìm thấy sản phẩm liên quan</p>
              )}
            </>
          )}
        </div>

        <div className="w-full bg-white z-10 h-[150px] px-36 py-5">
          <div className="search-container">
            <input 
              type="search" 
              className="search-input" 
              placeholder="Tìm kiếm" 
              value={searchTerm}
              onChange={handleSearch} 
            />
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13.5 12H13l-.35-.35A5.98 5.98 0 0014 7a6 6 0 10-6 6c.98 0 1.95-.24 2.8-.66l.34.35v.5L16 15l1-1-3.5-3.5zM8 12a4 4 0 110-8 4 4 0 010 8z" fill="#888" />
            </svg>
          </div>
          <div className="w-full text-center">
            <button onClick={onClose} className='w-10 h-10 bg-black rounded-full text-white mt-4'>X</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
