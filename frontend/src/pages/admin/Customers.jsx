import React, { useState, useMemo } from 'react';
import { Search, User, Mail, Phone, MapPin, Eye, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/currency';
import AdminHeader from '../../components/AdminHeader';
import Modal from '../../components/Modal';

export default function AdminCustomers() {
  const { customers, orders } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.name?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.city?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [customers, searchQuery]);

  // Orders belonging to selected customer
  const customerOrders = selectedCustomer
    ? orders.filter((o) => o.customer?.email?.toLowerCase() === selectedCustomer.email?.toLowerCase())
    : [];

  return (
    <div>
      <AdminHeader
        title="Customer Profiles"
        subtitle="Review customer activity, lifetime spending, and order history."
      />

      <div className="admin-main">
        {/* Search */}
        <div
          className="admin-controls-card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '24px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '360px', width: '100%' }}>
            <input
              type="text"
              placeholder="Search by customer name, email, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '38px', height: '42px', fontSize: '0.9rem' }}
            />
            <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Total Profiles: <strong>{filteredCustomers.length}</strong>
          </span>
        </div>

        {/* Customer Table */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden'
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '14px 20px' }}>Customer Name</th>
                  <th style={{ padding: '14px 20px' }}>Contact Information</th>
                  <th style={{ padding: '14px 20px' }}>Location</th>
                  <th style={{ padding: '14px 20px' }}>Total Orders</th>
                  <th style={{ padding: '14px 20px' }}>Lifetime Spend</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--yellow-light)', color: '#171717', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                          {c.name?.charAt(0) || '?'}
                        </div>
                        <div style={{ fontWeight: 800 }}>{c.name}</div>
                      </div>
                    </td>

                    <td style={{ padding: '14px 20px' }}>
                      <div>{c.email}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{c.phone}</div>
                    </td>

                    <td style={{ padding: '14px 20px' }}>
                      <span className="badge badge-gray">{c.city || 'Pakistan'}</span>
                    </td>

                    <td style={{ padding: '14px 20px', fontWeight: 700 }}>
                      {c.orderCount ?? 0} order(s)
                    </td>

                    <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {formatPrice(c.totalSpent)}
                    </td>

                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '6px 12px', gap: '4px' }}
                      >
                        <Eye size={14} />
                        <span>View Profile</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      <Modal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title={selectedCustomer ? `Customer Profile: ${selectedCustomer.name}` : ''}
        maxWidth="600px"
      >
        {selectedCustomer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-blue)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 900, boxShadow: 'var(--shadow-blue)' }}>
                {selectedCustomer.name?.charAt(0) || '?'}
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 900 }}>{selectedCustomer.name}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selectedCustomer.email}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selectedCustomer.phone} • {selectedCustomer.city}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Spending</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, marginTop: '4px' }}>
                  {formatPrice(selectedCustomer.totalSpent)}
                </div>
              </div>

              <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Orders Logged</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, marginTop: '4px' }}>
                  {selectedCustomer.orderCount ?? 0}
                </div>
              </div>
            </div>

            <div>
              <h5 style={{ fontWeight: 800, marginBottom: '10px' }}>Order History</h5>
              {customerOrders.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {customerOrders.map((ord) => (
                    <div key={ord.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.88rem' }}>
                      <div>
                        <strong>#{ord.id}</strong>
                        <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>
                          ({new Date(ord.createdAt || ord.date).toLocaleDateString()})
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="badge badge-yellow">{ord.status}</span>
                        <strong>{formatPrice(ord.grandTotal)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  No orders recorded for this customer yet.
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
