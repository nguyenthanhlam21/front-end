import React from 'react';
import BoxFixed from '../../theme/BoxFixed';

const LoginFixed = () => {
  const user = window.localStorage.getItem('user')

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    alert("User logged out") 
  };

  return (
    <>
      {user ? (
        <BoxFixed
          img={`url(https://png.pngtree.com/png-vector/20190917/ourlarge/pngtree-logout-icon-vectors-png-image_1737872.jpg)`}
          style={`w-[55px] h-[55px] rounded-full `}
          onClick={handleLogout}
        />
      ) : (
        <BoxFixed
            img={`url(https://img.pikbest.com/png-images/qianku/login-avatar-icon_2373155.png!sw800)`}
            style={`w-[55px] h-[55px] rounded-full `} onClick={undefined}        />
      )}
    </>
  );
};

export default LoginFixed;
