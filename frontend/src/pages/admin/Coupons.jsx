import React, { useState } from 'react';
import { Tag, Plus, Trash2, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/currency';
import AdminHeader from '../../components/AdminHeader';
import Modal from '../../components/Modal';

export default function AdminCoupons() {
  const { coupons, addCoupon, deleteCoupon } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage', // 'percentage' | 'fixed'
    value: 10,
    minSpend: 50000,
    description: '',
    expiresAt: '2026-12-31'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    try {
      await addCoupon({
        code: formData.code.trim().toUpperCase(),
        discountType: formData.discountType,
        value: Number(formData.value),
        minSpend: Number(formData.minSpend) || 0,
        description: formData.description,
        expiresAt: formData.expiresAt
      });
    } catch (err) {
      return;
    }

    setIsModalOpen(false);
    setFormData({
      code: '',
      discountType: 'percentage',
      value: 10,
      minSpend: 50000,
      description: '',
      expiresAt: '2026-12-31'
    });
  };

  return (
    <div>
      <AdminHeader
        title="Promotions & Coupons"
        subtitle="Manage active discount codes available for customers during checkout."
      />

      <div className="admin-main">
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
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Active Promo Codes</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              These codes can be entered on the Cart and Checkout pages.
            </p>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ gap: '8px' }}>
            <Plus size={18} />
            <span>Create New Coupon</span>
          </button>
        </div>

        {/* Coupons List Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {coupons.map((c) => (
            <div
              key={c.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'var(--yellow-light)',
                      border: '1px dashed #F59E0B',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1.05rem',
                      fontWeight: 900,
                      color: '#92400E'
                    }}
                  >
                    <Tag size={16} />
                    <span>{c.code}</span>
                  </div>

                  <span className="badge badge-success">Active</span>
                </div>

                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {c.discountType === 'percentage' ? `${c.value}% OFF` : `Rs. ${c.value.toLocaleString()} OFF`}
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.4 }}>
                  {c.description || `Applicable on orders above Rs. ${c.minSpend.toLocaleString()}`}
                </p>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Min Spend: <strong>Rs. {c.minSpend.toLocaleString()}</strong> • Expires: {c.expiresAt}
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => deleteCoupon(c.id)}
                  className="btn btn-outline btn-sm"
                  style={{ color: '#DC2626', borderColor: '#FECDD3', gap: '6px' }}
                >
                  <Trash2 size={14} />
                  <span>Delete Coupon</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Coupon Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Discount Coupon"
        maxWidth="520px"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Coupon Code *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g. VIP2026"
              className="form-input"
              style={{ textTransform: 'uppercase' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Discount Type</label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                className="form-select"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (PKR)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Discount Value *</label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="10"
                className="form-input"
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Minimum Order Spend (PKR)</label>
              <input
                type="number"
                value={formData.minSpend}
                onChange={(e) => setFormData({ ...formData, minSpend: e.target.value })}
                placeholder="50000"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Expiration Date</label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Promotional note for shoppers..."
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Coupon
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
