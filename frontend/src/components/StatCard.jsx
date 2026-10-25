import React from 'react';

export default function StatCard({ title, value, icon: Icon, change, isPositive = true, note }) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-heading">
        <span className="admin-stat-title">
          {title}
        </span>
        {Icon && (
          <div className="admin-stat-icon">
            <Icon size={19} />
          </div>
        )}
      </div>

      <div className="admin-stat-value">
        {value}
      </div>

      {(change || note) && (
        <div className="admin-stat-meta">
          {change && (
            <span
              className={isPositive ? 'admin-stat-change positive' : 'admin-stat-change negative'}
            >
              {isPositive ? `+${change}` : change}
            </span>
          )}
          {note && <span>{note}</span>}
        </div>
      )}
    </div>
  );
}
