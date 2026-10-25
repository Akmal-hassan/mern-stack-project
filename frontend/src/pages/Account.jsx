import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Package,
  Clock,
  CheckCircle2,
  ExternalLink,
  Edit2,
  Trash2,
  Plus
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import Breadcrumbs from '../components/Breadcrumbs';
import Modal from '../components/Modal';
import ProductCard from '../components/ProductCard';

export default function Account() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'orders'; // 'orders' | 'profile' | 'wishlist' | 'addresses' | 'settings'

  const { currentUser, orders, products, updateProfile, logout, addToast } = useStore();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Selected Order for Modal View
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    city: currentUser?.city || '',
    address: currentUser?.address || ''
  });

  React.useEffect(() => {
    if (!currentUser) return;
    setProfileForm({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      city: currentUser.city || '',
      address: currentUser.address || ''
    });
  }, [currentUser]);

  // Only show orders returned for the signed-in customer.
  const customerOrders = orders.filter((o) =>
    o.customer?.email?.toLowerCase() === currentUser?.email?.toLowerCase()
  );
  const displayOrders = customerOrders;

  // Filter wishlist products
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
    } catch (err) {
      // The store displays the API error.
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '85vh', paddingBottom: '80px' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Customer Account', path: '/account' }]} />

        {/* Account Top Summary Banner */}
        <div
          className="account-header"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)',
            padding: '32px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div className="account-header-profile" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-blue)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.4rem',
                boxShadow: 'var(--shadow-blue)'
              }}
            >
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="account-header-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  {currentUser?.name || 'Your Account'}
                </h1>
                <span className="badge badge-yellow">VIP Member</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '2px' }}>
                {[currentUser?.email, currentUser?.city].filter(Boolean).join(' • ')}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ gap: '6px' }}>
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Body Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '32px',
            alignItems: 'start'
          }}
          className="account-layout"
        >
          {/* Account Tabs Nav */}
          <aside
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '16px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <button
              onClick={() => setSearchParams({ tab: 'orders' })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: currentTab === 'orders' ? 'var(--primary-yellow)' : 'none',
                color: currentTab === 'orders' ? '#171717' : 'var(--text-primary)',
                fontWeight: currentTab === 'orders' ? 800 : 600,
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.92rem'
              }}
            >
              <ShoppingBag size={18} />
              <span style={{ flex: 1 }}>Order History</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(0,0,0,0.08)', padding: '2px 8px', borderRadius: '9999px' }}>
                {displayOrders.length}
              </span>
            </button>

            <button
              onClick={() => setSearchParams({ tab: 'wishlist' })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: currentTab === 'wishlist' ? 'var(--primary-yellow)' : 'none',
                color: currentTab === 'wishlist' ? '#171717' : 'var(--text-primary)',
                fontWeight: currentTab === 'wishlist' ? 800 : 600,
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.92rem'
              }}
            >
              <Heart size={18} />
              <span style={{ flex: 1 }}>My Wishlist</span>
              {wishlist.length > 0 && (
                <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(0,0,0,0.08)', padding: '2px 8px', borderRadius: '9999px' }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setSearchParams({ tab: 'profile' })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: currentTab === 'profile' ? 'var(--primary-yellow)' : 'none',
                color: currentTab === 'profile' ? '#171717' : 'var(--text-primary)',
                fontWeight: currentTab === 'profile' ? 800 : 600,
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.92rem'
              }}
            >
              <User size={18} />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => setSearchParams({ tab: 'addresses' })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: currentTab === 'addresses' ? 'var(--primary-yellow)' : 'none',
                color: currentTab === 'addresses' ? '#171717' : 'var(--text-primary)',
                fontWeight: currentTab === 'addresses' ? 800 : 600,
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.92rem'
              }}
            >
              <MapPin size={18} />
              <span>Saved Addresses</span>
            </button>
          </aside>

          {/* Tab Content Display */}
          <main style={{ minWidth: 0 }}>
            {/* 1. Orders Tab */}
            {currentTab === 'orders' && (
              <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>Your Orders</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Track your current dispatches and review previous purchases.
                </p>

                {displayOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-secondary)' }}>
                    <Package size={40} color="#9CA3AF" style={{ margin: '0 auto 12px auto' }} />
                    <p>No orders recorded yet. Your purchases will appear here.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {displayOrders.map((ord) => (
                      <div
                        key={ord.id}
                        style={{
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          padding: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '16px'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <strong style={{ fontSize: '1.05rem' }}>#{ord.id}</strong>
                            <span className="badge badge-yellow">{ord.status}</span>
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            Placed on {new Date(ord.createdAt || ord.date).toLocaleDateString()} • {ord.items?.length || 0} item(s)
                          </div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                            {formatPrice(ord.grandTotal)}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="btn btn-outline btn-sm"
                          >
                            <span>View Order Details</span>
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. Wishlist Tab */}
            {currentTab === 'wishlist' && (
              <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '4px' }}>Your Saved Items</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Smartphones and accessories you have bookmarked.
                    </p>
                  </div>
                  <span className="badge badge-gray">{wishlist.length} Saved</span>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-secondary)' }}>
                    <Heart size={40} color="#9CA3AF" style={{ margin: '0 auto 12px auto' }} />
                    <p>Your wishlist is currently empty. Explore the catalog and tap the heart icon!</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                    {wishlistProducts.map((prod) => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Profile Tab */}
            {currentTab === 'profile' && (
              <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', maxWidth: '640px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px' }}>Personal Profile</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Update your contact and delivery recipient details.
                </p>

                <form onSubmit={handleProfileSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      readOnly
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Default City</label>
                    <input
                      type="text"
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Default Street Address</label>
                    <input
                      type="text"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg">
                    Save Profile Changes
                  </button>
                </form>
              </div>
            )}

            {/* 4. Addresses Tab */}
            {currentTab === 'addresses' && (
              <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '4px' }}>Saved Delivery Addresses</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Fast autofill addresses for your orders across Pakistan.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {currentUser?.address ? <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', border: '2px solid var(--primary-blue)', backgroundColor: 'var(--blue-light)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '1rem' }}>Primary Residence</strong>
                      <span className="badge badge-yellow">Default</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#171717', lineHeight: 1.5, marginBottom: '12px' }}>
                      {[currentUser.address, currentUser.city, currentUser.state, currentUser.postalCode].filter(Boolean).join(', ')}
                    </p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary-blue)' }}>
                      Phone: {currentUser.phone || 'Not provided'}
                    </div>
                  </div> : <p style={{ color: 'var(--text-secondary)' }}>No delivery address is saved yet. Add one in your profile.</p>}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order Details: #${selectedOrder.id}` : ''}
        maxWidth="640px"
      >
        {selectedOrder && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', fontSize: '0.88rem' }}>
              <div>
                <div><strong>Status:</strong> <span className="badge badge-yellow">{selectedOrder.status}</span></div>
                <div><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div><strong>Payment:</strong> {selectedOrder.paymentMethod}</div>
                <div><strong>Courier:</strong> {selectedOrder.shippingMethod || 'Standard'}</div>
              </div>
            </div>

            <div>
              <h5 style={{ fontWeight: 800, marginBottom: '10px' }}>Items in this Order</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          Qty: {item.quantity} {item.storage ? `• ${item.storage}` : ''} {item.ptaStatus && item.ptaStatus !== 'Not Applicable' ? `• ${item.ptaStatus}` : ''}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700 }}>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.15rem' }}>
              <span>Total Paid:</span>
              <span>{formatPrice(selectedOrder.grandTotal)}</span>
            </div>
          </div>
        )}
      </Modal>

      <style>{`
        @media (max-width: 900px) {
          .account-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
