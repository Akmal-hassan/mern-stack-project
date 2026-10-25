import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Smartphone,
  ShoppingBag,
  Users,
  BarChart3,
  Tag,
  Settings,
  LogOut,
  Store
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function AdminSidebar() {
  const { logout, orders } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const pendingOrdersCount = orders.filter((o) => o.status === 'Processing' || o.status === 'Pending').length;

  return (
    <aside className="admin-sidebar">
      {/* Brand Header */}
      <div className="admin-sidebar-header">
        <Link to="/admin" className="admin-brand">
          <span className="admin-brand-mark">B</span>
          <span className="admin-brand-copy">
            <strong>BlueBells</strong>
            <small>Commerce console</small>
          </span>
        </Link>

        {/* Quick action buttons for Tablet / iPad & Mobile */}
        <div className="admin-mobile-header-actions">
          <Link
            to="/"
            className="admin-mobile-action-btn"
            title="Back to Store"
            aria-label="Back to Store"
          >
            <Store size={16} />
            <span className="admin-mobile-btn-text">Store</span>
          </Link>
          <button
            onClick={handleLogout}
            className="admin-mobile-action-btn admin-logout-btn"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut size={16} />
            <span className="admin-mobile-btn-text">Logout</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">
        <span className="admin-nav-label">Workspace</span>
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <span className="admin-nav-label admin-nav-label-spaced">Store management</span>
        <NavLink
          to="/admin/products"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <Smartphone size={18} />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <ShoppingBag size={18} />
          <span style={{ flex: 1 }}>Orders</span>
          {pendingOrdersCount > 0 && (
            <span style={{ backgroundColor: 'var(--primary-blue)', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 800, padding: '2px 7px', borderRadius: '9999px', boxShadow: '0 2px 8px rgba(37,99,235,0.4)' }}>
              {pendingOrdersCount}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <Users size={18} />
          <span>Customers</span>
        </NavLink>

        <NavLink
          to="/admin/analytics"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <BarChart3 size={18} />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/admin/coupons"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <Tag size={18} />
          <span>Coupons</span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Sidebar Footer */}
      <div className="admin-sidebar-footer">
        <Link
          to="/"
          className="admin-nav-item"
        >
          <Store size={18} />
          <span>Back to Store</span>
        </Link>

        <button
          onClick={handleLogout}
          className="admin-nav-item"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
