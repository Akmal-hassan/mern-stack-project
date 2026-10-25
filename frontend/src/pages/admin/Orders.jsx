import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  PackageCheck,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/currency';
import AdminHeader from '../../components/AdminHeader';
import Modal from '../../components/Modal';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = o.id.toLowerCase().includes(q);
        const matchName = o.customer?.fullName?.toLowerCase().includes(q);
        const matchEmail = o.customer?.email?.toLowerCase().includes(q);
        if (!matchId && !matchName && !matchEmail) return false;
      }
      if (statusFilter !== 'All' && o.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [orders, searchQuery, statusFilter]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      if (selectedOrder && (selectedOrder.id === orderId || selectedOrder.orderNumber === orderId)) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      // Toast handled
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="badge badge-success">Delivered</span>;
      case 'Shipped':
        return <span className="badge badge-yellow">Shipped</span>;
      case 'Processing':
        return <span className="badge badge-new">Processing</span>;
      case 'Cancelled':
        return <span className="badge badge-sale">Cancelled</span>;
      default:
        return <span className="badge badge-gray">{status}</span>;
    }
  };

  return (
    <div>
      <AdminHeader
        title="Order Management"
        subtitle="Review, track, and update customer order fulfillment status live."
      />

      <div className="admin-main">
        {/* Controls Bar */}
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
          <div style={{ display: 'flex', gap: '12px', flex: '1 1 360px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 240px' }}>
              <input
                type="text"
                placeholder="Search by Order ID, Customer Name, or Email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px', height: '42px', fontSize: '0.9rem' }}
              />
              <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
              style={{ width: 'auto', height: '42px', fontSize: '0.88rem' }}
            >
              <option value="All">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredOrders.length}</strong> orders
          </div>
        </div>

        {/* Orders Table */}
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
                  <th style={{ padding: '14px 20px' }}>Order ID</th>
                  <th style={{ padding: '14px 20px' }}>Customer</th>
                  <th style={{ padding: '14px 20px' }}>Items Summary</th>
                  <th style={{ padding: '14px 20px' }}>Total Amount</th>
                  <th style={{ padding: '14px 20px' }}>Status</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>#{ord.id}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {new Date(ord.createdAt || ord.date).toLocaleDateString()}
                      </div>
                    </td>

                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontWeight: 700 }}>{ord.customer?.fullName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {ord.customer?.email} • {ord.customer?.city}
                      </div>
                    </td>

                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {ord.items?.slice(0, 2).map((item, i) => (
                          <img
                            key={i}
                            src={item.image}
                            alt={item.name}
                            style={{ width: '32px', height: '32px', objectFit: 'contain', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)', padding: '2px' }}
                            title={item.name}
                          />
                        ))}
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {ord.items?.length} item(s)
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {formatPrice(ord.grandTotal)}
                    </td>

                    <td style={{ padding: '14px 20px' }}>
                      {getStatusBadge(ord.status)}
                    </td>

                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-color)',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            backgroundColor: '#FFFFFF',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '6px 10px' }}
                          title="View order details"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order Details: #${selectedOrder.id}` : ''}
        maxWidth="680px"
      >
        {selectedOrder && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Status Change Bar inside modal */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--yellow-light)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid #FFE082' }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400E' }}>Order Status:</span>{' '}
                <strong style={{ color: '#171717' }}>{selectedOrder.status}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#78350F' }}>Change to:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #D97706',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Customer & Shipping Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div>
                <h5 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Customer Information
                </h5>
                <div style={{ fontWeight: 700 }}>{selectedOrder.customer?.fullName}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selectedOrder.customer?.email}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selectedOrder.customer?.phone}</div>
              </div>

              <div>
                <h5 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Delivery Address
                </h5>
                <div style={{ fontSize: '0.88rem' }}>{selectedOrder.customer?.address}</div>
                <div style={{ fontSize: '0.88rem' }}>{selectedOrder.customer?.city}, {selectedOrder.customer?.state} {selectedOrder.customer?.postalCode}</div>
                <div style={{ fontSize: '0.8rem', color: '#16A34A', fontWeight: 700, marginTop: '4px' }}>
                  {selectedOrder.paymentMethod}
                </div>
              </div>
            </div>

            {/* Items */}
            <div>
              <h5 style={{ fontWeight: 800, marginBottom: '10px' }}>Ordered Items</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          Qty: {item.quantity} {item.storage ? `• ${item.storage}` : ''} {item.ptaStatus && item.ptaStatus !== 'Not Applicable' ? `• ${item.ptaStatus}` : ''} {item.color ? `• ${item.color}` : ''}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 800 }}>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Totals Summary */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal:</span>
                <span>{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Shipping Fee:</span>
                <span>{selectedOrder.shippingFee === 0 ? 'FREE' : formatPrice(selectedOrder.shippingFee)}</span>
              </div>
              {selectedOrder.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                  <span>Discounts:</span>
                  <span>-{formatPrice(selectedOrder.discountAmount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.2rem', paddingTop: '8px', borderTop: '1px solid var(--border-color)', marginTop: '4px' }}>
                <span>Total:</span>
                <span>{formatPrice(selectedOrder.grandTotal)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
