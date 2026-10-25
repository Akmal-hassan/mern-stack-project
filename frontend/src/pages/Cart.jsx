import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartLoading } = useCart();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', paddingBottom: '80px' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Shopping Cart', path: '/cart' }]} />

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
            Shopping Cart
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Review your selected smartphones, smartwatches, and accessories before proceeding to checkout.
          </p>
        </div>

        {cartLoading ? (
          <div style={{ padding: '80px 24px', textAlign: 'center' }}>Loading your saved cart...</div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart View */
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)',
              padding: '80px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'var(--yellow-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}
            >
              <ShoppingBag size={40} color="#D97706" />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>
              Your Cart is Empty
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '420px', lineHeight: 1.6, marginBottom: '32px' }}>
              Explore our luxury collection of Apple iPhones, Samsung Galaxy smartphones, Apple Watches, and premium mobile accessories.
            </p>

            <Link to="/shop" className="btn btn-primary btn-lg" style={{ gap: '10px' }}>
              <span>Start Shopping</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          /* Populated Cart Layout */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 380px',
              gap: '36px',
              alignItems: 'start'
            }}
            className="cart-grid"
          >
            {/* Left Items Column */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                padding: '32px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                  Cart Items ({cartItems.length})
                </span>
                <button
                  onClick={clearCart}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#DC2626',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Clear Cart
                </button>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.cartItemId}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              {/* Bottom Actions */}
              <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <Link to="/shop" className="btn btn-outline" style={{ gap: '8px' }}>
                  <ArrowLeft size={16} />
                  <span>Continue Shopping</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} color="#16A34A" /> 100% Genuine
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Truck size={16} color="var(--primary-blue)" /> Insured Transit
                  </span>
                </div>
              </div>
            </div>

            {/* Right Summary Column */}
            <div>
              <OrderSummary
                showCheckoutButton={true}
                onCheckoutClick={() => navigate('/checkout')}
              />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 960px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
