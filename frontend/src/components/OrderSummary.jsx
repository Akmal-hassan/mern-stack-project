import React, { useState } from 'react';
import { Tag, ShieldCheck, Truck, ArrowRight, X } from 'lucide-react';
import { formatPrice } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export default function OrderSummary({ showCheckoutButton = true, onCheckoutClick }) {
  const { totals, appliedCoupon, appliedCouponCode, applyCoupon, removeCoupon } = useCart();
  const { settings } = useStore();
  const [couponInput, setCouponInput] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const freeThreshold = settings.freeShippingThreshold || 50000;
  const remainingForFreeShipping = Math.max(0, freeThreshold - totals.subtotal);
  const progressPercent = Math.min(100, Math.round((totals.subtotal / freeThreshold) * 100));

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: '24px',
        position: 'sticky',
        top: '100px'
      }}
    >
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>Order Summary</h3>

      {/* Free Shipping Progress Indicator */}
      <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
          <Truck size={16} color="var(--primary-blue)" />
          {totals.subtotal >= freeThreshold ? (
            <span style={{ color: 'var(--color-success)' }}>You unlocked Free Insured Delivery!</span>
          ) : (
            <span>Add {formatPrice(remainingForFreeShipping)} more for Free Shipping</span>
          )}
        </div>
        <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: 'var(--primary-blue)',
              borderRadius: '9999px',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>

      {/* Breakdown Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', fontSize: '0.95rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Subtotal ({totals.totalQuantity} items)</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatPrice(totals.subtotal)}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Insured Courier Shipping</span>
          <span style={{ fontWeight: 600, color: totals.shippingFee === 0 ? 'var(--color-success)' : 'var(--text-primary)' }}>
            {totals.shippingFee === 0 ? 'FREE' : formatPrice(totals.shippingFee)}
          </span>
        </div>

        {totals.discountAmount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={14} /> Coupon Discount ({appliedCouponCode})
            </span>
            <span style={{ fontWeight: 700 }}>-{formatPrice(totals.discountAmount)}</span>
          </div>
        )}
      </div>

      {/* Promo Code Input */}
      {appliedCoupon ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: '#FEF3C7',
            border: '1px dashed #F59E0B',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#92400E' }}>
            <Tag size={16} />
            <span>Code {appliedCoupon.code} applied</span>
          </div>
          <button
            onClick={removeCoupon}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#92400E', padding: '2px', display: 'flex' }}
            title="Remove coupon"
            aria-label="Remove coupon"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Promo code (e.g. BLUEBELLS10)"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.88rem',
              textTransform: 'uppercase'
            }}
          />
          <button type="submit" className="btn btn-outline btn-sm">
            Apply
          </button>
        </form>
      )}

      {/* Total Amount */}
      <div style={{ paddingTop: '16px', borderTop: '2px solid var(--border-color)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Grand Total</span>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>All taxes & import duties included</div>
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>
            {formatPrice(totals.grandTotal)}
          </span>
        </div>
      </div>

      {/* Action Button */}
      {showCheckoutButton && (
        <button
          onClick={onCheckoutClick}
          disabled={totals.totalQuantity === 0}
          className="btn btn-primary btn-block btn-lg"
          style={{ width: '100%', cursor: totals.totalQuantity === 0 ? 'not-allowed' : 'pointer', opacity: totals.totalQuantity === 0 ? 0.5 : 1 }}
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={18} />
        </button>
      )}

      {/* Trust Badges */}
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={16} color="#16A34A" />
          <span>PTA Approved with Official Brand Warranty</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Truck size={16} color="var(--primary-blue)" />
          <span>Sealed Delivery with Real-Time Rider Tracking</span>
        </div>
      </div>
    </div>
  );
}
