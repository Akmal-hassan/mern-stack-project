import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { settings, addToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      addToast('Thank you for subscribing! Check your inbox for exclusive VIP smartphone drops.', 'success');
      setNewsletterEmail('');
    } else {
      addToast('Please enter a valid email address', 'error');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Store Bio */}
          <div>
            <div className="brand-logo" style={{ color: '#FFFFFF', marginBottom: '12px' }}>
              <span className="brand-logo-mark">B</span>
              <span>
                Blue<span className="brand-logo-accent">Bells</span> <span style={{ fontSize: '0.85em', fontWeight: 600, color: '#93C5FD' }}>Electronics</span>
              </span>
            </div>

            {/* Official iPhone Shop Certification Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(37, 99, 235, 0.18)',
                border: '1px solid rgba(96, 165, 250, 0.4)',
                marginBottom: '16px',
                width: 'fit-content'
              }}
            >
              <ShieldCheck size={16} color="#60A5FA" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.78rem', color: '#93C5FD', fontWeight: 700, letterSpacing: '0.3px' }}>
                Certified &amp; Official Member of Official iPhone Shop
              </span>
            </div>

            <p style={{ color: '#9CA3AF', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Pakistan's certified luxury mobile boutique. Direct authorized member of Official iPhone Shop, bringing genuine Apple iPhones, Samsung Galaxy flagships, and authentic accessories to clients nationwide.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#D1D5DB' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="#60A5FA" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{settings.storeAddress}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#60A5FA" style={{ flexShrink: 0 }} />
                <a href="https://wa.me/923005902425" target="_blank" rel="noopener noreferrer" style={{ color: '#93C5FD', fontWeight: 700 }}>
                  WhatsApp: {settings.supportPhone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#60A5FA" style={{ flexShrink: 0 }} />
                <a href={`mailto:${settings.supportEmail}`} style={{ color: '#D1D5DB' }}>{settings.supportEmail}</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={16} color="#60A5FA" style={{ flexShrink: 0 }} />
                <span>Mon – Sat: 11:00 AM – 10:00 PM (PKT)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 className="footer-col-title">Flagship Collections</h4>
            <ul className="footer-links">
              <li><Link to="/iphone" className="footer-link">Apple iPhone 16 Pro Max</Link></li>
              <li><Link to="/iphone" className="footer-link">Apple iPhone 16 Series</Link></li>
              <li><Link to="/samsung" className="footer-link">Samsung Galaxy S24 Ultra</Link></li>
              <li><Link to="/samsung" className="footer-link">Samsung Galaxy Z Fold6</Link></li>
              <li><Link to="/shop?category=apple-watch" className="footer-link">Apple Watch Ultra 2 & S10</Link></li>
              <li><Link to="/shop?category=audio" className="footer-link">AirPods Pro & Galaxy Buds</Link></li>
              <li><Link to="/shop?category=accessories" className="footer-link">MagSafe & Fast Chargers</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Demo */}
          <div>
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About BlueBells Store</Link></li>
              <li><Link to="/contact" className="footer-link">Store Locations & Concierge</Link></li>
              <li><Link to="/account" className="footer-link">Order Tracking & History</Link></li>
              <li><Link to="/cart" className="footer-link">Shopping Cart & Checkout</Link></li>
              <li><span className="footer-link" style={{ opacity: 0.7 }}>PTA Approved Guaranteed</span></li>
              <li><span className="footer-link" style={{ opacity: 0.7 }}>1-Year Official Warranty</span></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="footer-col-title">Stay Connected</h4>
            <p style={{ color: '#9CA3AF', fontSize: '0.88rem', marginBottom: '16px', lineHeight: 1.5 }}>
              Subscribe to receive instant updates on official Apple & Samsung launch events, flash sales, and VIP promotions.
            </p>
            {subscribed ? (
              <div style={{ backgroundColor: 'rgba(37, 99, 235, 0.15)', border: '1px solid var(--primary-blue)', padding: '14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="#60A5FA" />
                <span style={{ fontSize: '0.85rem', color: '#93C5FD', fontWeight: 600 }}>Subscribed! Welcome to BlueBells VIP.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #374151',
                    backgroundColor: '#1F2937',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ padding: '10px 16px' }}
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </form>
            )}

            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(37, 99, 235, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={20} color="#60A5FA" />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF' }}>100% Genuine Guarantee</div>
                <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Sealed Factory Packing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} BlueBells Mobile Store. All rights reserved. Built with React & Vite.
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <span>Verified PTA Compliant</span>
            <span>Insured Courier Delivery</span>
            <span>Prices displayed in Pakistani Rupees (PKR / Rs.)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
