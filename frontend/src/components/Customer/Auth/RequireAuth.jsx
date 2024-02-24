import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const useRequireAuth = () => {
    const token = useSelector((state) => state.token.value);
    const navigate = useNavigate();  // Change the hook here
  
    useEffect(() => {
      if (token === '') {
        navigate('/login');
      }
    }, [token]);
  
    return token; // You can also return other authentication-related data if needed
  };
  
  export default useRequireAuth;