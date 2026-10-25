import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ padding: '16px 0', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
      <ol style={{ listStyle: 'none', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', transition: 'color 0.15s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <Home size={15} />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ChevronRight size={14} color="#9CA3AF" />
              {isLast || !item.path ? (
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  style={{ color: 'var(--text-secondary)', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
