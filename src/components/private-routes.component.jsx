import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem('@user_details') !== null;
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
};

export default ProtectedRoutes;