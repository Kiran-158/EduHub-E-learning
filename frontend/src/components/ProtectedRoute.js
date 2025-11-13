// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly }) => {
    // Check for admin token
    const adminToken = localStorage.getItem('token');
    
    // Check for general user info
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userToken = userInfo ? userInfo.token : null;

    if (adminOnly) {
        // If it's an admin-only route, only an admin token works
        return adminToken ? children : <Navigate to="/admin/login" />;
    } else {
        // If it's a general protected route, a user token works
        return userToken ? children : <Navigate to="/login" />;
    }
};

export default ProtectedRoute;