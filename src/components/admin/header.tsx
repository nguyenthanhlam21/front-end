import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/theme';
import useOrder from '../../hook/useOder';
import { Link } from 'react-router-dom';

const Header = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [query, setQuery] = useState('');
  const { darkMode, toggleDarkMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [notifying1, setNotifying1] = useState('');
  const dropdownRef = useRef(null);
  const { order, loadingOrder } = useOrder();
  console.log(order)
  const fitt = order?.filter(bill => 
    bill.orderStatus === 'Chờ xử lý'
);

useEffect(() => {
  if (fitt && fitt.length > 0) {
    setNotifying(true);
  } else {
    setNotifying(false);
  }
}, [fitt]);


  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
    setDropdownOpen(!dropdownOpen);
    setNotifying(false);
  };
  
    const toggleDropdown1 = (e) => {
      e.preventDefault();
      setDropdownOpen1(!dropdownOpen1);
      setNotifying1(false);
    };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    setSidebarToggle(!sidebarToggle);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };
  

  return (
    <>
    <header className={`fixed right-0 w-[1246px] top-0 z-50 shadow-md flex  duration-300 ease-in-out  ${darkMode ? 'bg-[#24303F] ' : 'bg-white'}  dark:bg-boxdark dark:drop-shadow-none`}>
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
            onClick={handleToggle}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!sidebarToggle ? '!w-full delay-300' : ''}`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!sidebarToggle ? '!w-full delay-400' : ''}`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!sidebarToggle ? '!w-full delay-500' : ''}`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!sidebarToggle ? '!h-0 delay-[0]' : ''}`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!sidebarToggle ? '!h-0 delay-200' : ''}`}
                ></span>
              </span>
            </span>
          </button>
          <a className="block flex-shrink-0 lg:hidden" href="index.html">
            <img src="" alt="Logo" />
          </a>
        </div>
        {/* Search */}
        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST" onSubmit={handleSubmit}>
            <div className="relative">
              <button type="submit" className="absolute left-0 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-blue-400 dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                value={query}
                onChange={handleChange}
                className="w-full bg-transparent pl-9 pr-4 focus:outline-none xl:w-125 "
              />
              
            </div>
          </form>
        </div>
        
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className='flex items-center gap-2 2xsm:gap-4'>
            {/* Darkmode-open */}
            <li>
            <label
              className={`relative block h-[1.875rem] w-14 rounded-full ${darkMode ? 'bg-primary' : 'bg-stroke'}`}
            >
              <input
                type="checkbox"
                checked={darkMode}
                onChange={ toggleDarkMode}
                className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
              />
              <span
                 className={`absolute items-center justify-center left-1 top-1/2 flex h-6 w-6 -translate-y-1/2 duration-75 ease-linear rounded-full bg-white shadow-switcher ${darkMode ? '!right-1 !translate-x-full' : 'translate-x-0'}`}
              >
                <span  className={darkMode ? 'hidden' : ''}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99992 12.6666C10.5772 12.6666 12.6666 10.5772 12.6666 7.99992C12.6666 5.42259 10.5772 3.33325 7.99992 3.33325C5.42259 3.33325 3.33325 5.42259 3.33325 7.99992C3.33325 10.5772 5.42259 12.6666 7.99992 12.6666Z"
                      fill="#969AA1"
                    />
                    <path
                      d="M8.00008 15.3067C7.63341 15.3067 7.33342 15.0334 7.33342 14.6667V14.6134C7.33342 14.2467 7.63341 13.9467 8.00008 13.9467C8.36675 13.9467 8.66675 14.2467 8.66675 14.6134C8.66675 14.9801 8.36675 15.3067 8.00008 15.3067ZM12.7601 13.4267C12.5867 13.4267 12.4201 13.3601 12.2867 13.2334L12.2001 13.1467C11.9401 12.8867 11.9401 12.4667 12.2001 12.2067C12.4601 11.9467 12.8801 11.9467 13.1401 12.2067L13.2267 12.2934C13.4867 12.5534 13.4867 12.9734 13.2267 13.2334C13.1001 13.3601 12.9334 13.4267 12.7601 13.4267ZM3.24008 13.4267C3.06675 13.4267 2.90008 13.3601 2.76675 13.2334C2.50675 12.9734 2.50675 12.5534 2.76675 12.2934L2.85342 12.2067C3.11342 11.9467 3.53341 11.9467 3.79341 12.2067C4.05341 12.4667 4.05341 12.8867 3.79341 13.1467L3.70675 13.2334C3.58008 13.3601 3.40675 13.4267 3.24008 13.4267ZM14.6667 8.66675H14.6134C14.2467 8.66675 13.9467 8.36675 13.9467 8.00008C13.9467 7.63341 14.2467 7.33342 14.6134 7.33342C14.9801 7.33342 15.3067 7.63341 15.3067 8.00008C15.3067 8.36675 15.0334 8.66675 14.6667 8.66675ZM1.38675 8.66675H1.33341C0.966748 8.66675 0.666748 8.36675 0.666748 8.00008C0.666748 7.63341 0.966748 7.33342 1.33341 7.33342C1.70008 7.33342 2.02675 7.63341 2.02675 8.00008C2.02675 8.36675 1.75341 8.66675 1.38675 8.66675ZM12.6734 3.99341C12.5001 3.99341 12.3334 3.92675 12.2001 3.80008C11.9401 3.54008 11.9401 3.12008 12.2001 2.86008L12.2867 2.77341C12.5467 2.51341 12.9667 2.51341 13.2267 2.77341C13.4867 3.03341 13.4867 3.45341 13.2267 3.71341L13.1401 3.80008C13.0134 3.92675 12.8467 3.99341 12.6734 3.99341ZM3.32675 3.99341C3.15341 3.99341 2.98675 3.92675 2.85342 3.80008L2.76675 3.70675C2.50675 3.44675 2.50675 3.02675 2.76675 2.76675C3.02675 2.50675 3.44675 2.50675 3.70675 2.76675L3.79341 2.85342C4.05341 3.11342 4.05341 3.53341 3.79341 3.79341C3.66675 3.92675 3.49341 3.99341 3.32675 3.99341ZM8.00008 2.02675C7.63341 2.02675 7.33342 1.75341 7.33342 1.38675V1.33341C7.33342 0.966748 7.63341 0.666748 8.00008 0.666748C8.36675 0.666748 8.66675 0.966748 8.66675 1.33341C8.66675 1.70008 8.36675 2.02675 8.00008 2.02675Z"
                      fill="#969AA1"
                    />
                  </svg>
                </span>
                <span className={darkMode ? 'inline-block' : 'hidden'}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.3533 10.62C14.2466 10.44 13.9466 10.16 13.1999 10.2933C12.7866 10.3667 12.3666 10.4 11.9466 10.38C10.3933 10.3133 8.98659 9.6 8.00659 8.5C7.13993 7.53333 6.60659 6.27333 6.59993 4.91333C6.59993 4.15333 6.74659 3.42 7.04659 2.72666C7.33993 2.05333 7.13326 1.7 6.98659 1.55333C6.83326 1.4 6.47326 1.18666 5.76659 1.48C3.03993 2.62666 1.35326 5.36 1.55326 8.28666C1.75326 11.04 3.68659 13.3933 6.24659 14.28C6.85993 14.4933 7.50659 14.62 8.17326 14.6467C8.27993 14.6533 8.38659 14.66 8.49326 14.66C10.7266 14.66 12.8199 13.6067 14.1399 11.8133C14.5866 11.1933 14.4666 10.8 14.3533 10.62Z"
                      fill="#969AA1"
                    />
                  </svg>
                </span>
              </span>
            </label>
            </li>
            {/* Bell */}
            <li className="relative" ref={dropdownRef}>
              <a
                className={`flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full  hover:text-primary ${darkMode ? 'bg-[#313D4A]' : 'bg-gray'}`}
                href="#"
                onClick={toggleDropdown}
              >
                {notifying && <span className="absolute -top-0.5 right-0 h-2 w-2 rounded-full bg-meta-1" />}
                <svg className={`fill-current duration-300 ease-in-out ${darkMode ? 'text-white' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z" fill=""></path>
                </svg>
              </a>

              {dropdownOpen && (
                <div className={`absolute right-[0] mt-[0.625rem] flex h-[22.5rem] w-[18.75rem] flex-col rounded-sm border-stroke border-[1px]  shadow-default ${darkMode ? 'bg-[#24303F]  border-[#313D4A]' : 'bg-white'}`}>
                <div className="px-[1.25rem] py-3">
                  <h5 className="text-sm font-medium text-bodydark2">Thông báo</h5>
                </div>
                <ul className="flex h-auto flex-col overflow-y-auto">
                  {fitt?.map((fitt,index)=>(
                    <li key={index}>
                    <Link to={`bill/detail/${fitt._id}`} className={`flex flex-col gap-2.5  ${darkMode ? 'border-[#313D4A] hover:bg-[rgba(49,61,74,1)]' : 'border-gray hover:bg-gray-2'} border-[1px]  px-4.5 py-3 hover:bg-gray-2`} href="#">
                      <p className={`text-sm ${darkMode ? 'text-white' : ''}`}>
                        Đơn hàng {fitt.orderCode} cần được xử lý
                      </p>
                      <p className="text-xs text-gray-400">
                      {new Intl.DateTimeFormat('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }).format(new Date(fitt.createdAt))}
                      </p>
                    </Link>
                  </li>
                  ))}
                </ul>
              </div>
              )}
            </li>
            {/* Message */}
            <li className="relative" onBlur={() => setDropdownOpen1(false)}>
              <a
                className={` relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white ${darkMode ? 'bg-[#313D4A]' : 'bg-gray'}`}
                href="#"
                onClick={toggleDropdown1}
              >
                <span className={`absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${!notifying1 && 'hidden'}`}>
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                </span>
                <svg className={`${darkMode ? 'text-white' : ''} fill-current duration-300 ease-in-out`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.9688 1.57495H7.03135C3.43135 1.57495 0.506348 4.41558 0.506348 7.90308C0.506348 11.3906 2.75635 13.8375 8.26885 16.3125C8.40947 16.3687 8.52197 16.3968 8.6626 16.3968C8.85947 16.3968 9.02822 16.3406 9.19697 16.2281C9.47822 16.0593 9.64697 15.75 9.64697 15.4125V14.2031H10.9688C14.5688 14.2031 17.522 11.3625 17.522 7.87495C17.522 4.38745 14.5688 1.57495 10.9688 1.57495ZM10.9688 12.9937H9.3376C8.80322 12.9937 8.35322 13.4437 8.35322 13.9781V15.0187C3.6001 12.825 1.74385 10.8 1.74385 7.9312C1.74385 5.14683 4.10635 2.8687 7.03135 2.8687H10.9688C13.8657 2.8687 16.2563 5.14683 16.2563 7.9312C16.2563 10.7156 13.8657 12.9937 10.9688 12.9937Z" fill=""></path>
                  <path d="M5.42812 7.28442C5.0625 7.28442 4.78125 7.56567 4.78125 7.9313C4.78125 8.29692 5.0625 8.57817 5.42812 8.57817C5.79375 8.57817 6.075 8.29692 6.075 7.9313C6.075 7.56567 5.79375 7.28442 5.42812 7.28442Z" fill=""></path>
                  <path d="M9.00015 7.28442C8.63452 7.28442 8.35327 7.56567 8.35327 7.9313C8.35327 8.29692 8.63452 8.57817 9.00015 8.57817C9.33765 8.57817 9.64702 8.29692 9.64702 7.9313C9.64702 7.56567 9.33765 7.28442 9.00015 7.28442Z" fill=""></path>
                  <path d="M12.5719 7.28442C12.2063 7.28442 11.925 7.56567 11.925 7.9313C11.925 8.29692 12.2063 8.57817 12.5719 8.57817C12.9375 8.57817 13.2188 8.29692 13.2188 7.9313C13.2188 7.56567 12.9094 7.28442 12.5719 7.28442Z" fill=""></path>
                </svg>
              </a>

              {dropdownOpen1 && (
                <div className={`absolute right-[0] mt-[0.625rem] flex h-[22.5rem] w-[18.75rem] flex-col rounded-sm border-stroke border-[1px]   shadow-default ${darkMode ? 'bg-[#24303F] border-[#313D4A]' : 'bg-white'}`}>
                  <div className="px-4.5 py-3">
                    <h5 className="text-sm font-medium text-bodydark2">Tin Nhắn</h5>
                  </div>
                  <ul className="flex h-auto flex-col overflow-y-auto">
                  <li className=''>
                    <a
                      className={`flex  gap-4.5 border-t border-stroke px-4.5 py-3  dark:border-strokedark  ${darkMode ? 'border-[#313D4A] hover:bg-[rgba(49,61,74,1)]' : 'border-gray hover:bg-gray-2'} border-[1px]`}
                      href="messages.html"
                    >
                      <div className="h-12.5 w-12.5 rounded-full">
                        <img src="https://demo.tailadmin.com/src/images/user/user-02.png" alt="User" />
                      </div>

                      <div>
                        <h6 className={`text-sm font-medium text-black ${darkMode ? 'text-white' : ''}`}>
                          Thu
                        </h6>
                        <p className="text-sm text-bodydark2">Có ai trả lời được tôi không?</p>
                        <p className="text-xs text-bodydark2">2 phút trước</p>
                      </div>
                    </a>
                  </li>
                  </ul>
                </div>
              )}

            </li>
            {/* user */}
            <li>
              
            </li>
          </ul>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
