import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { CheckCircle2, PackageCheck, Truck, ArrowRight, ShieldCheck, ShoppingBag, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/currency';
import api from '../services/api';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const location = useLocation();
  const { orders, currentUser } = useStore();

  const [loadedOrder, setLoadedOrder] = React.useState(location.state?.order || null);
  const order = loadedOrder || orders.find((o) => o.id === orderId || o.orderNumber === orderId);

  useEffect(() => {
    if (order || !currentUser) return;
    let isMounted = true;
    api.orders.getById(orderId, currentUser.email)
      .then((response) => {
        if (isMounted && response.success) setLoadedOrder(response.data);
      })
      .catch((err) => console.warn('[OrderConfirmation] Could not load order:', err.message));
    return () => {
      isMounted = false;
    };
  }, [currentUser, order, orderId]);

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#1D4ED8', '#60A5FA', '#FFFFFF', '#93C5FD']
      });
    } catch (e) {
      // safe fallback if canvas-confetti is not loaded
    }
  }, []);

  if (!order) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Order Confirmation</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '16px 0 24px 0' }}>
          Thank you for choosing BlueBells.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: '60px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Success Header Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)',
            padding: '48px 36px',
            textAlign: 'center',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: '#DCFCE7',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}
          >
            <CheckCircle2 size={48} color="#16A34A" />
          </div>

          <span className="badge badge-yellow" style={{ marginBottom: '12px' }}>
            Order Placed Successfully
          </span>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '12px' }}>
            Thank You for Your Order!
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            Your order <strong style={{ color: 'var(--text-primary)' }}>#{order.id}</strong> has been saved. We've notified our concierge team to prepare your sealed packaging.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary" style={{ gap: '8px' }}>
              <ShoppingBag size={18} />
              <span>Continue Shopping</span>
            </Link>

            <Link to="/account" className="btn btn-outline" style={{ gap: '8px' }}>
              <span>View My Orders</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Order Details Breakdown Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '36px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Order Number</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>#{order.id}</div>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Order Date</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                {new Date(order.createdAt || order.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status</span>
              <div>
                <span className="badge badge-yellow">{order.status}</span>
              </div>
            </div>
          </div>

          {/* Purchased Items */}
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '16px' }}>Purchased Items</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                  />
                  <div>
                    <h5 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.name}</h5>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Qty: {item.quantity} {item.storage ? `• ${item.storage}` : ''} {item.ptaStatus && item.ptaStatus !== 'Not Applicable' ? `• ${item.ptaStatus}` : ''} {item.color ? `• ${item.color}` : ''}
                    </span>
                  </div>
                </div>

                <span style={{ fontWeight: 800, fontSize: '1rem' }}>
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Shipping & Payment Summary Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-color)',
              marginBottom: '24px'
            }}
            className="confirmation-grid"
          >
            <div>
              <h5 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Delivery Address
              </h5>
              <div style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>
                <strong>{order.customer.fullName}</strong>
                <div>{order.customer.address}</div>
                <div>{order.customer.city}, {order.customer.state} {order.customer.postalCode}</div>
                <div style={{ color: 'var(--text-secondary)' }}>{order.customer.phone}</div>
              </div>
            </div>

            <div>
              <h5 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Payment &amp; Delivery Method
              </h5>
              <div style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>
                <div><strong>Payment:</strong> {order.paymentMethod}</div>
                <div><strong>Delivery:</strong> {order.shippingMethod || 'Standard Insured Courier'}</div>
                <div style={{ color: 'var(--color-success)', fontWeight: 600, marginTop: '4px' }}>
                  Insured Sealed Parcel Handover
                </div>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.92rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Insured Shipping</span>
              <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                <span>Discounts Applied</span>
                <span>-{formatPrice(order.discountAmount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-color)', fontWeight: 900, fontSize: '1.25rem' }}>
              <span>Grand Total</span>
              <span>{formatPrice(order.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .confirmation-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
