import React from 'react';
import { Navigate } from 'react-router-dom';

const withAdminAuth = (WrappedComponent) => {
    const AdminAuth = (props) => { 
      const user = JSON.parse(window.localStorage.getItem('user'));
  
      if (!user || user.role !== 'admin') {
        return <Navigate to="/notfound" />;
      }
  
      return <WrappedComponent {...props} />; 
    };
  
    return AdminAuth;
  };
  
  export default withAdminAuth;
  
