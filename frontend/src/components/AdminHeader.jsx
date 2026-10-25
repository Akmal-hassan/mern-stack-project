import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function AdminHeader({ title, subtitle }) {
  return (
    <header className="admin-topbar">
      <div className="admin-page-heading">
        <span className="admin-eyebrow">BLUEBELLS MANAGEMENT</span>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="admin-topbar-actions">
        <span className="admin-workspace-badge">
          <ShieldCheck size={15} />
          <span>Administrator</span>
        </span>

        <div className="admin-user-chip">
          <span className="admin-user-avatar">AD</span>
          <span className="admin-user-details">
            <strong>Administrator</strong>
            <small>Full access</small>
          </span>
        </div>
      </div>
    </header>
  );
}
