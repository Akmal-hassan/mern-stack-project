import React from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Smartphone,
  TrendingUp,
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock,
  Package
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/currency';
import AdminHeader from '../../components/AdminHeader';
import StatCard from '../../components/StatCard';

export default function Dashboard() {
  const { products, orders, customers, adminMetrics } = useStore();

  // Database-backed metrics with fallback to local calculations
  const totalRevenue = adminMetrics?.totalRevenue ?? orders.reduce((acc, ord) => acc + (ord.grandTotal || 0), 0);
  const totalOrdersCount = adminMetrics?.totalOrders ?? orders.length;
  const totalCustomersCount = customers.length;
  const totalProductsCount = adminMetrics?.totalProductsInInventory ?? products.length;

  const recentOrders = adminMetrics?.recentOrders || orders.slice(0, 5);
  const topSelling = adminMetrics?.bestSellingProducts?.length ? adminMetrics.bestSellingProducts : products.slice(0, 4);

  // Status breakdown
  const processingCount = adminMetrics?.pendingOrders ?? orders.filter((o) => o.status === 'Processing').length;
  const shippedCount = adminMetrics?.shippedOrders ?? orders.filter((o) => o.status === 'Shipped').length;
  const deliveredCount = adminMetrics?.completedOrders ?? orders.filter((o) => o.status === 'Delivered').length;

  // Monthly Sales Bar Visualization
  const monthlyData = adminMetrics?.monthlyData || [];

  return (
    <div>
      <AdminHeader
        title="Store Overview & Analytics"
        subtitle="Business figures synchronized with persistent MongoDB records."
      />

      <div className="admin-main">
        {/* 4 Primary Metric Stat Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: '32px'
          }}
          className="admin-stats-grid admin-dashboard-stats"
        >
          <StatCard
            title="Total Revenue"
            value={formatPrice(totalRevenue)}
            icon={DollarSign}
            note="Live persistent revenue"
          />

          <StatCard
            title="Total Orders"
            value={totalOrdersCount}
            icon={ShoppingBag}
            note="Recorded orders"
          />

          <StatCard
            title="Registered Customers"
            value={totalCustomersCount}
            icon={Users}
            note="Verified buyer profiles"
          />

          <StatCard
            title="Active Catalog Items"
            value={totalProductsCount}
            icon={Smartphone}
            note="iPhones, Galaxy & Gear"
          />
        </div>

        {/* Charts & Status Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.6fr',
            gap: '28px',
            marginBottom: '32px'
          }}
          className="dashboard-charts-grid admin-dashboard-charts"
        >
          {/* Revenue Chart Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '28px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Revenue Overview (PKR)</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Monthly revenue from recorded orders
                </p>
              </div>
              <span className="badge badge-yellow">Monthly</span>
            </div>

            {/* Custom Bar Visualization */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                height: '220px',
                paddingTop: '20px',
                borderBottom: '1px solid var(--border-color)',
                gap: '16px'
              }}
              className="admin-dashboard-panel"
            >
              {monthlyData.length === 0 ? (
                <p style={{ alignSelf: 'center', color: 'var(--text-secondary)' }}>
                  No monthly revenue data available yet.
                </p>
              ) : monthlyData.map((d, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                    Rs. {(d.amount / 100000).toFixed(1)}L
                  </div>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '44px',
                      height: `${d.height}%`,
                      backgroundColor: i === monthlyData.length - 1 ? 'var(--primary-blue)' : '#93C5FD',
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.3s ease',
                      boxShadow: i === monthlyData.length - 1 ? 'var(--shadow-blue)' : 'none'
                    }}
                  />
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '8px' }}>
                    {d.month}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Status Distribution Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            className="admin-dashboard-panel"
          >
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px' }}>Order Fulfillment</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                Current order queue
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} color="#D97706" /> Processing / Pending
                    </span>
                    <span>{processingCount} Orders</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#F3F4F6', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${(processingCount / Math.max(1, totalOrdersCount)) * 100}%`, height: '100%', backgroundColor: '#F59E0B' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Package size={14} color="#2563EB" /> In Transit / Shipped
                    </span>
                    <span>{shippedCount} Orders</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#F3F4F6', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${(shippedCount / Math.max(1, totalOrdersCount)) * 100}%`, height: '100%', backgroundColor: '#2563EB' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={14} color="#16A34A" /> Delivered
                    </span>
                    <span>{deliveredCount} Orders</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#F3F4F6', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${(deliveredCount / Math.max(1, totalOrdersCount)) * 100}%`, height: '100%', backgroundColor: '#16A34A' }} />
                  </div>
                </div>
              </div>
            </div>

            <Link to="/admin/orders" className="btn btn-outline btn-block btn-sm" style={{ marginTop: '24px', justifyContent: 'center' }}>
              <span>Manage All Orders</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '28px',
            marginBottom: '32px'
          }}
          className="admin-dashboard-panel admin-dashboard-table-panel"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Recent Orders</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Recent customer orders
              </p>
            </div>
            <Link to="/admin/orders" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
              <span>View All Orders</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px' }}>Order ID</th>
                  <th style={{ padding: '12px 16px' }}>Customer</th>
                  <th style={{ padding: '12px 16px' }}>Total Amount</th>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((ord) => (
                  <tr key={ord.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700 }}>#{ord.id}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600 }}>{ord.customer?.fullName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{ord.customer?.email}</div>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 800 }}>{formatPrice(ord.grandTotal)}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {new Date(ord.createdAt || ord.date).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className="badge badge-yellow">{ord.status}</span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <Link to="/admin/orders" className="btn btn-outline btn-sm" style={{ padding: '4px 10px' }}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top-Selling Products Row */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '28px'
          }}
          className="admin-dashboard-panel"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Top-Selling Smartphones</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Flagships driving the highest consumer interest
              </p>
            </div>
            <Link to="/admin/products" className="btn btn-outline btn-sm">
              Manage Inventory
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="admin-products-grid">
            {topSelling.map((p) => (
              <div
                key={p.id}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: '56px', height: '56px', objectFit: 'contain' }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    {p.brand}
                  </div>
                  <h5 style={{ fontSize: '0.92rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.name}
                  </h5>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {formatPrice(p.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dashboard-charts-grid { grid-template-columns: 1fr !important; }
          .admin-products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .admin-stats-grid:not(.admin-dashboard-stats) { grid-template-columns: 1fr !important; }
          .admin-dashboard-stats { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .admin-products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
