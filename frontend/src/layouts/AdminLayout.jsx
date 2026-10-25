import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Toast from '../components/Toast';
import PageLoader from '../components/PageLoader';
import { useStore } from '../context/StoreContext';

export default function AdminLayout() {
  const { authLoading, currentUser, isAdminLoggedIn } = useStore();
  const location = useLocation();

  if (authLoading) {
    return <PageLoader message="Verifying administrator session..." />;
  }

  if (!isAdminLoggedIn) {
    return currentUser
      ? <Navigate to="/" replace />
      : <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
      <Toast />
    </div>
  );
}
