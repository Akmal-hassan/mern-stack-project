import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  const { settings } = useStore();

  if (!settings.announcementActive) return null;

  return (
    <div className="announcement-bar">
      <div className="container announcement-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <span className="announcement-badge" style={{ backgroundColor: 'var(--primary-blue)', color: '#FFFFFF', fontWeight: 800 }}>
            ★ Certified iPhone Shop
          </span>
          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', color: '#E2E8F0', fontWeight: 600 }}>
            {settings.announcementText}
          </span>
        </div>

        <div className="announcement-links">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#94A3B8' }}>
            <ShieldCheck size={14} color="#60A5FA" /> Official iPhone Shop Member
          </span>
          <a
            href="https://wa.me/923005902425"
            target="_blank"
            rel="noopener noreferrer"
            className="announcement-link"
            style={{ color: '#93C5FD', fontWeight: 700 }}
          >
            <Phone size={14} color="#60A5FA" />
            <span>WhatsApp: {settings.supportPhone}</span>
          </a>
          <Link to="/admin" className="announcement-link" style={{ color: '#93C5FD', fontWeight: 600 }}>
            Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
