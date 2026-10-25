import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, Shield, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { totals } = useCart();
  const { wishlist } = useWishlist();
  const { currentUser, isAdminLoggedIn } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        {/* Left: Mobile Menu Toggle & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="header-icon-btn mobile-menu-btn"
            style={{ display: 'none' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="brand-logo">
            <span className="brand-logo-mark">B</span>
            <span>
              Blue<span className="brand-logo-accent">Bells</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Menu */}
        <nav className="desktop-nav">
          <ul className="nav-menu">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/iphone" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                iPhone
              </NavLink>
            </li>
            <li>
              <NavLink to="/samsung" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Samsung
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop?category=accessories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Accessories
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right: Search, Wishlist, Cart, Account */}
        <div className="header-actions">
          {/* Quick Search Bar (desktop expandable or inline) */}
          <form onSubmit={handleSearchSubmit} className="desktop-search-form" style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search iPhone, Galaxy, Watch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '220px',
                padding: '8px 36px 8px 14px',
                borderRadius: '9999px',
                border: '1px solid var(--border-color)',
                fontSize: '0.85rem',
                outline: 'none',
                backgroundColor: 'var(--bg-secondary)',
                transition: 'width 0.2s ease, border-color 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.width = '280px';
                e.target.style.borderColor = 'var(--text-primary)';
              }}
              onBlur={(e) => {
                if (!searchQuery) {
                  e.target.style.width = '220px';
                  e.target.style.borderColor = 'var(--border-color)';
                }
              }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)'
              }}
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Wishlist Icon */}
          <Link to="/account?tab=wishlist" className="header-icon-btn" title="My Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && <span className="header-badge">{wishlist.length}</span>}
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="header-icon-btn" title="Shopping Cart">
            <ShoppingCart size={20} />
            {totals.totalQuantity > 0 && (
              <span className="header-badge">{totals.totalQuantity}</span>
            )}
          </Link>

          {/* User Account / Login */}
          <Link
            to={currentUser ? "/account" : "/login"}
            className="header-icon-btn"
            title={currentUser ? `Account: ${currentUser.name}` : "Login / Register"}
          >
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 99,
            display: 'flex',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '80%',
              maxWidth: '320px',
              backgroundColor: '#FFFFFF',
              height: '100%',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-xl)',
              animation: 'slideInRight 0.25s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div className="brand-logo">
                <span className="brand-logo-mark">B</span>
                <span>BlueBells</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} style={{ marginBottom: '24px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 36px 10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Search size={18} />
              </button>
            </form>

            {/* Mobile Nav Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '10px 0', fontWeight: 600, borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>Home</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '10px 0', fontWeight: 600, borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>Shop All</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/iphone"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '10px 0', fontWeight: 600, borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>Apple iPhone</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/samsung"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '10px 0', fontWeight: 600, borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>Samsung Galaxy</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/shop?category=accessories"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '10px 0', fontWeight: 600, borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>Accessories</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '10px 0', fontWeight: 600, borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>About BlueBells</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '10px 0', fontWeight: 600, borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>Contact Us</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Style tweaks for responsive mobile menu button */}
      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none; }
          .desktop-search-form { display: none; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
