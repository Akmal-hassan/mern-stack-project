import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, HeartHandshake, Truck, Users, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function About() {
  const stats = [
    { value: '18,500+', label: 'Delivered Flagships (Sample)', note: 'Across Pakistan' },
    { value: '100%', label: 'PTA Tax Compliant', note: 'Direct Approval' },
    { value: '99.4%', label: 'Positive Customer Rating', note: 'Verified Buyers' },
    { value: '24-48h', label: 'Average Transit Time', note: 'Major Metros' }
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingBottom: '80px' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'About BlueBells', path: '/about' }]} />

        {/* Hero Section */}
        <div style={{ padding: '40px 0 60px 0', textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', backgroundColor: 'var(--blue-light)', border: '1px solid var(--border-blue)', color: 'var(--primary-blue)', fontSize: '0.82rem', fontWeight: 800, marginBottom: '16px' }}>
            <ShieldCheck size={16} />
            <span>Certified &amp; Official Member of Official iPhone Shop</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '20px' }}>
            Blue Bells Electronics. The Flagship Mobile Destination.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Located at <strong>Shop # 33, Sattagadai Plaza, 32 The Mall, Peshawar Cantt.</strong>, Blue Bells Electronics is a certified official member of Official iPhone Shop, bringing authentic Apple iPhones, Samsung Galaxy smartphones, and genuine accessories to connoisseurs nationwide.
          </p>
        </div>

        {/* Feature Visual Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '32px',
            marginBottom: '80px',
            alignItems: 'center'
          }}
          className="about-visual-grid"
        >
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              height: '400px'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop"
              alt="Blue Bells Electronics Store Interior Showcase"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div
            style={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '44px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '400px',
              border: '1px solid #1E293B'
            }}
          >
            <span className="badge badge-yellow" style={{ alignSelf: 'flex-start', marginBottom: '16px' }}>
              Official iPhone Shop Member
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, lineHeight: 1.25, marginBottom: '16px' }}>
              Built On Integrity, Precision &amp; Trust
            </h3>
            <p style={{ color: '#D1D5DB', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              We started with a singular mandate: when a customer invests in an iPhone or Samsung flagship at Blue Bells Electronics in Peshawar, they deserve an infallible guarantee of authenticity, verified PTA approval, and official warranty support.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60A5FA', fontWeight: 700, fontSize: '0.9rem' }}>
              <CheckCircle2 size={18} />
              <span>Certified Official Member of Official iPhone Shop.</span>
            </div>
          </div>
        </div>

        {/* Key Statistics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: '80px'
          }}
          className="stats-grid"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#171717', marginBottom: '6px' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {s.note}
              </div>
            </div>
          ))}
        </div>

        {/* Brand Values */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <span className="badge badge-yellow" style={{ marginBottom: '10px' }}>Our Core Pillars</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>What Defines The BlueBells Way</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="values-grid">
            <div style={{ padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: '#FFFFFF' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--yellow-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <ShieldCheck size={24} color="#171717" />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>Pristine Authenticity</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Every iPhone and Samsung Galaxy device is sourced through authorized distributor pipelines. Customers can verify the IMEI on official Apple Coverage and Samsung Knox portals before unsealing.
              </p>
            </div>

            <div style={{ padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: '#FFFFFF' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--yellow-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Award size={24} color="#171717" />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>Official Warranty</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Full manufacturer backed warranty. In the rare event of a technical defect, our concierge assists you with authorized Apple and Samsung service centers across Lahore, Karachi, and Islamabad.
              </p>
            </div>

            <div style={{ padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: '#FFFFFF' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--yellow-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Truck size={24} color="#171717" />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>Insured White-Glove Dispatch</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                High-tier electronics require careful handling. We package every item in reinforced, branded protective casing with transit insurance and live SMS / WhatsApp tracking updates.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div
          style={{
            backgroundColor: '#171717',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '60px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '16px' }}>
            Ready to Upgrade to the Ultimate Flagship?
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 32px auto', lineHeight: 1.6 }}>
            Browse our catalog for current pricing, official storage variants, and exclusive accessories.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg" style={{ gap: '10px' }}>
            <span>Explore The Collection</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .about-visual-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
