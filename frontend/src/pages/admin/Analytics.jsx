import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Smartphone,
  DollarSign
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/currency';
import AdminHeader from '../../components/AdminHeader';
import StatCard from '../../components/StatCard';

export default function AdminAnalytics() {
  const { products, orders, adminMetrics } = useStore();

  const totalRevenue = adminMetrics?.totalRevenue ?? orders.reduce((acc, o) => acc + (o.grandTotal || 0), 0);
  const averageOrderValue = adminMetrics?.averageOrderValue ?? (orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0);
  const totalOrders = adminMetrics?.totalOrders ?? orders.length;
  const totalProducts = adminMetrics?.totalProductsInInventory ?? products.length;
  const brandShare = adminMetrics?.brandShare || [];

  const categoryCounts = products.reduce((counts, product) => {
    const category = product.category || 'other';
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});
  const categoryColors = ['#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];
  const categoryLabels = adminMetrics?.categoryShare || Object.entries(categoryCounts).map(([key, count], index) => ({
    key,
    name: key,
    color: categoryColors[index % categoryColors.length],
    share: products.length ? Math.round((count / products.length) * 100) : 0
  }));

  return (
    <div>
      <AdminHeader
        title="Sales & Business Analytics"
        subtitle="Visual metrics calculated from persistent MongoDB order records."
      />

      <div className="admin-main">
        {/* KPI Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: '32px'
          }}
          className="admin-stats-grid"
        >
          <StatCard
            title="Total Revenue"
            value={formatPrice(totalRevenue)}
            icon={DollarSign}
            note="Lifetime recorded revenue"
          />

          <StatCard
            title="Average Order Value"
            value={formatPrice(averageOrderValue)}
            icon={TrendingUp}
            note="Per checkout cart"
          />

          <StatCard
            title="Orders Processed"
            value={totalOrders}
            icon={ShoppingBag}
            note="Recorded orders"
          />

          <StatCard
            title="Active Catalog Items"
            value={totalProducts}
            icon={Smartphone}
            note="Current products"
          />
        </div>

        {/* Charts Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '28px',
            marginBottom: '32px'
          }}
          className="dashboard-charts-grid"
        >
          {/* Revenue by Category Card */}
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Revenue by Category</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Product lineup sales contribution
                </p>
              </div>
              <span className="badge badge-yellow">Proportions</span>
            </div>

            {/* Visual Bars for each category */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {categoryLabels.map((cat) => (
                <div key={cat.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>
                    <span>{cat.name}</span>
                    <span>{cat.share}%</span>
                  </div>
                  <div style={{ height: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${cat.share}%`,
                        height: '100%',
                        backgroundColor: cat.color,
                        borderRadius: '9999px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales by Brand */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '28px'
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>Sales by Brand</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
              Revenue contribution from recorded orders
            </p>

            {brandShare.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No brand sales data available yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {brandShare.map((brand) => (
                  <div key={brand.key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>
                      <span>{brand.name}</span>
                      <span>{brand.share}%</span>
                    </div>
                    <div style={{ height: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${brand.share}%`,
                          height: '100%',
                          backgroundColor: brand.color,
                          borderRadius: '9999px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Brand proportions are calculated from revenue in non-cancelled, non-refunded orders.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dashboard-charts-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .admin-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
