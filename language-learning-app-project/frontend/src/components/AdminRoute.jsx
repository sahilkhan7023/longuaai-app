import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  // Check for admin token in localStorage as fallback
  const adminToken = localStorage.getItem('adminToken');
  const adminUser = localStorage.getItem('adminUser');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <LoadingSpinner size="large" text="Verifying permissions..." />
      </div>
    );
  }

  // If we have admin token, allow access
  if (adminToken && adminUser) {
    return children;
  }

  // Check regular user admin status
  if (user && isAdmin()) {
    return children;
  }

  // If no user at all, redirect to admin login
  if (!user && !adminToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If user exists but not admin, redirect to regular dashboard
  if (user && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;

