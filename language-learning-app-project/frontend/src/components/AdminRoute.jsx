import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <LoadingSpinner size="large" text="Verifying permissions..." />
      </div>
    );
  }

  // Check if user is logged in and has admin role
  if (user && isAdmin()) {
    return children;
  }

  // Check for demo admin token as fallback
  const adminToken = localStorage.getItem('adminToken');
  const adminUser = localStorage.getItem('adminUser');
  
  if (adminToken && adminUser) {
    try {
      const parsedAdminUser = JSON.parse(adminUser);
      if (parsedAdminUser && (parsedAdminUser.role === 'admin' || parsedAdminUser.role === 'super_admin')) {
        return children;
      }
    } catch (error) {
      // Invalid admin user data, clear it
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    }
  }

  // If no user at all, redirect to admin login
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If user exists but not admin, redirect to regular dashboard
  return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;

