import React from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Headphones,
  Award,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const MARQUEE_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Official Warranty',
    subtext: '100% Genuine Brand Coverage'
  },
  {
    icon: Truck,
    title: 'Fast & Secure Delivery',
    subtext: 'Insured Transit Across Pakistan'
  },
  {
    icon: RotateCcw,
    title: '14 Days Easy Return',
    subtext: 'Hassle-Free Replacement Policy'
  },
  {
    icon: CreditCard,
    title: 'Cash on Delivery',
    subtext: 'Pay Safely at Your Doorstep'
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    subtext: 'Dedicated WhatsApp Helpline'
  },
  {
    icon: Award,
    title: 'Best Price Guarantee',
    subtext: 'Verified Lowest Market Rates'
  },
  {
    icon: CheckCircle2,
    title: 'Pre-Activated Safety',
    subtext: '100% PTA Approved Stock'
  },
  {
    icon: Sparkles,
    title: '100% Original Products',
    subtext: 'Factory Sealed Box Packing'
  }
];

export default function HeroMarquee() {
  // Duplicate array twice to ensure seamless, jitter-free infinite looping
  const duplicatedList = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="hero-marquee-wrapper" aria-label="Store Benefits and Guarantees">
      <div className="hero-marquee-track">
        {duplicatedList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="hero-marquee-item">
              <div className="hero-marquee-icon-box">
                <Icon size={19} className="hero-marquee-icon" />
              </div>
              <div className="hero-marquee-content">
                <span className="hero-marquee-title">{item.title}</span>
                <span className="hero-marquee-subtext">{item.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
