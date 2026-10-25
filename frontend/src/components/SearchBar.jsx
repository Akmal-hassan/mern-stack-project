import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search for iPhone 16, Galaxy S24, AirPods...", onClear }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input"
        style={{
          paddingLeft: '44px',
          paddingRight: value ? '40px' : '16px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          fontSize: '0.95rem'
        }}
      />
      <Search
        size={18}
        color="#6B7280"
        style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none'
        }}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#9CA3AF',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex'
          }}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
