import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Shield, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Login() {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.pathname === '/register');
  const [loginType, setLoginType] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, register } = useStore();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/account';

  useEffect(() => {
    setIsRegister(location.pathname === '/register');
  }, [location.pathname]);

  const selectLoginType = (type) => {
    setLoginType(type);
    setErrors({});
    if (type === 'admin') {
      setIsRegister(false);
      setEmail('');
      setPassword('');
    } else {
      setIsRegister(location.pathname === '/register');
    }
  };

  const validate = () => {
    const errs = {};
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!password || password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (isRegister && !name.trim()) errs.name = 'Full name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    try {
      if (isRegister) {
        const ok = await register({ name, email, password });
        if (ok) navigate(from, { replace: true });
      } else {
        const expectedRole = loginType === 'admin' ? 'admin' : 'user';
        const ok = await login(email, password, expectedRole);
        if (ok) navigate(loginType === 'admin' ? '/admin' : (from.startsWith('/admin') ? '/account' : from), { replace: true });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-xl)',
          maxWidth: '480px',
          width: '100%',
          padding: '40px 36px',
          position: 'relative'
        }}
      >
        {/* Header Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="brand-logo" style={{ justifyContent: 'center', marginBottom: '12px' }}>
            <span className="brand-logo-mark">B</span>
            <span>Blue<span className="brand-logo-accent">Bells</span></span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)' }}>
            {isRegister
              ? 'Create Your Account'
              : loginType === 'admin' ? 'Administrator Sign In' : 'Customer Sign In'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            {isRegister
              ? 'Join Pakistan’s premier destination for genuine mobile flagships'
              : loginType === 'admin'
                ? 'Sign in to manage the BlueBells store'
                : 'Sign in to access your orders, saved addresses & wishlist'}
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            {[
              { id: 'customer', label: 'Customer', icon: User },
              { id: 'admin', label: 'Admin', icon: Shield }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => selectLoginType(id)}
                aria-pressed={loginType === id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: loginType === id ? '2px solid var(--primary-blue)' : '1px solid var(--border-color)',
                  backgroundColor: loginType === id ? 'var(--blue-light)' : '#FFFFFF',
                  color: loginType === id ? 'var(--primary-blue)' : 'var(--text-primary)',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                <Icon size={17} />
                <span>Login as {label}</span>
              </button>
            ))}
          </div>
          {loginType === 'admin' && (
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', textAlign: 'center' }}>
              Administrator accounts are provisioned by BlueBells and cannot be created here.
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Daniyal Khan"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  style={{ paddingLeft: '40px' }}
                />
                <User size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`form-input ${errors.email ? 'error' : ''}`}
                style={{ paddingLeft: '40px' }}
              />
              <Mail size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              {!isRegister && (
                <span style={{ fontSize: '0.8rem', color: '#D97706', cursor: 'pointer', fontWeight: 600 }}>
                  Forgot password?
                </span>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`form-input ${errors.password ? 'error' : ''}`}
                style={{ paddingLeft: '40px', paddingRight: '40px' }}
              />
              <Lock size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--primary-blue)', width: '16px', height: '16px' }}
              />
              <span>Remember this device</span>
            </label>
          </div>

          <button type="submit" disabled={submitting} className="btn btn-primary btn-block btn-lg" style={{ width: '100%', marginBottom: '16px', opacity: submitting ? 0.7 : 1 }}>
            <span>{submitting ? 'Please wait...' : isRegister ? 'Create Customer Account' : `Sign In as ${loginType === 'admin' ? 'Admin' : 'Customer'}`}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Customer registration toggle */}
        {loginType === 'customer' && (
          <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '20px', fontSize: '0.9rem' }}>
            {isRegister ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(false);
                  navigate('/login');
                }}
                style={{ background: 'none', border: 'none', color: '#171717', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              New to BlueBells?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true);
                  navigate('/register');
                }}
                style={{ background: 'none', border: 'none', color: '#171717', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Create an account
              </button>
            </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
