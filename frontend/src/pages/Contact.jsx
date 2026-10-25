import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_FAQS } from '../data/demoData';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Contact() {
  const { settings, addToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast('Please fill in all required message fields', 'error');
      return;
    }

    setSubmitted(true);
    addToast('Simulated message sent! Our demo concierge will assist you.', 'success');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', paddingBottom: '80px' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Contact Us', path: '/contact' }]} />

        {/* Page Title */}
        <div style={{ padding: '24px 0 40px 0', textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <span className="badge badge-yellow" style={{ marginBottom: '12px' }}>
            We're Here to Assist
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '14px' }}>
            Get in Touch with BlueBells
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Whether you need PTA status clarification, serial number verification, corporate bulk ordering, or warranty support, our specialists are ready to help.
          </p>
        </div>

        {/* 4 Contact Info Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '48px'
          }}
          className="contact-info-grid"
        >
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Phone size={20} color="var(--primary-blue)" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Phone &amp; WhatsApp</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Direct concierge line</p>
            <a href="https://wa.me/923005902425" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-blue)', fontWeight: 800, fontSize: '0.95rem' }}>
              03005902425
            </a>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Mail size={20} color="var(--primary-blue)" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Email Support</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Replies within 2 hours</p>
            <a href="mailto:nomanjvd9@gmail.com" style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
              nomanjvd9@gmail.com
            </a>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <MapPin size={20} color="var(--primary-blue)" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Blue Bells Electronics</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Shop # 33, Sattagadai Plaza, 32 The Mall, Peshawar Cantt.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Clock size={20} color="var(--primary-blue)" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Business Hours</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>Mon – Sat: 11:00 AM – 10:00 PM</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Sunday: 2:00 PM – 9:00 PM</p>
          </div>
        </div>

        {/* Contact Form & Location Map Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '32px',
            marginBottom: '64px',
            alignItems: 'start'
          }}
          className="contact-layout"
        >
          {/* Form */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '36px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>Send Us a Message</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Fill in your inquiry details below. Note: As a frontend demonstration, message submission displays a simulated response state.
            </p>

            {submitted ? (
              <div style={{ padding: '32px', backgroundColor: '#F0FDF4', borderRadius: 'var(--radius-md)', border: '1px solid #BBF7D0', textAlign: 'center' }}>
                <CheckCircle2 size={40} color="#16A34A" style={{ margin: '0 auto 16px auto' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534', marginBottom: '8px' }}>
                  Simulated Message Received!
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#166534', lineHeight: 1.5, marginBottom: '20px' }}>
                  Thank you, <strong>{formData.name}</strong>. In a live production environment, this triggers an automated email to our concierge team.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="btn btn-outline btn-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Daniyal Khan"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. daniyal@example.com"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-select"
                    >
                      <option value="General Inquiry">General Product Inquiry</option>
                      <option value="PTA Verification">PTA Status Verification</option>
                      <option value="Corporate Orders">Corporate / Bulk Purchase</option>
                      <option value="Warranty Claim">Warranty Claim Assistance</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message *</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on the model, storage, color, or delivery city..."
                    className="form-textarea"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ width: '100%' }}>
                  <Send size={18} />
                  <span>Send Simulated Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Location Map Illustration & Flagship Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '28px',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Storefront Location</h4>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, backgroundColor: 'var(--blue-light)', color: 'var(--primary-blue)', padding: '4px 10px', borderRadius: '9999px', border: '1px solid var(--border-blue)' }}>
                  ★ Official iPhone Shop Member
                </span>
              </div>
              {/* Map Illustration */}
              <div
                style={{
                  height: '240px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                  textAlign: 'center',
                  padding: '20px'
                }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'var(--primary-blue)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-blue)' }}>
                  <MapPin size={26} color="#FFFFFF" />
                </div>
                <div style={{ marginTop: '14px', fontWeight: 900, fontSize: '1rem', color: '#171717', backgroundColor: '#FFFFFF', padding: '6px 16px', borderRadius: '9999px', boxShadow: 'var(--shadow-sm)' }}>
                  Blue Bells Electronics
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-blue)', marginTop: '8px' }}>
                  Shop # 33, Sattagadai Plaza, 32 The Mall, Peshawar Cantt.
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>
                  Certified Official iPhone &amp; Samsung Flagship Store
                </span>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--blue-navy)', color: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <MessageSquare size={20} color="#60A5FA" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Instant WhatsApp Concierge</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#9CA3AF', lineHeight: 1.5, marginBottom: '16px' }}>
                Need instant photos of sealed box packaging, PTA verification, or immediate stock availability? Connect directly with Blue Bells Electronics on WhatsApp.
              </p>
              <a
                href="https://wa.me/923005902425"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-block btn-sm"
                style={{ width: '100%', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem' }}
              >
                Chat on WhatsApp (03005902425)
              </a>
            </div>
          </div>
        </div>

        {/* FAQs Accordion Section */}
        <div className="contact-faq" style={{ backgroundColor: '#FFFFFF', padding: '48px 40px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px auto' }}>
            <span className="badge badge-yellow" style={{ marginBottom: '8px' }}>Got Questions?</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '840px', margin: '0 auto' }}>
            {STORE_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: isOpen ? 'var(--bg-secondary)' : '#FFFFFF',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '0.98rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--primary-blue)" /> : <ChevronDown size={18} color="#9CA3AF" />}
                  </button>
                  {isOpen && (
                    <div style={{ padding: '20px', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-color)' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .contact-info-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .contact-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
