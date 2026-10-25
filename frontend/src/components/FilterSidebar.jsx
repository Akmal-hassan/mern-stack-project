import React from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  priceRange,
  onPriceChange,
  selectedStorage,
  onSelectStorage,
  inStockOnly,
  onToggleInStock,
  onResetFilters,
  categories = []
}) {
  const brands = ['All', 'Apple', 'Samsung'];
  const storageOptions = ['All', '64GB', '128GB', '256GB', '512GB', '1TB'];

  return (
    <aside style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1.05rem' }}>
          <Filter size={18} color="var(--primary-blue)" />
          <span>Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          className="btn btn-outline btn-sm"
          style={{ fontSize: '0.75rem', padding: '4px 10px', height: 'auto', gap: '4px' }}
        >
          <RotateCcw size={12} />
          <span>Clear All</span>
        </button>
      </div>

      {/* Brand Filter */}
      <div style={{ marginBottom: '28px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Brand
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {brands.map((brand) => (
            <label
              key={brand}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                color: (brand === 'All' && !selectedBrand) || selectedBrand === brand ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: (brand === 'All' && !selectedBrand) || selectedBrand === brand ? 700 : 500
              }}
            >
              <input
                type="radio"
                name="brandFilter"
                checked={(brand === 'All' && !selectedBrand) || selectedBrand === brand}
                onChange={() => onSelectBrand(brand === 'All' ? '' : brand)}
                style={{ accentColor: 'var(--primary-blue)', width: '16px', height: '16px' }}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories Filter */}
      <div style={{ marginBottom: '28px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Category
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              color: !selectedCategory ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: !selectedCategory ? 700 : 500
            }}
          >
            <input
              type="radio"
              name="catFilter"
              checked={!selectedCategory}
              onChange={() => onSelectCategory('')}
              style={{ accentColor: 'var(--primary-blue)', width: '16px', height: '16px' }}
            />
            <span>All Categories</span>
          </label>
          {categories.map((cat) => (
            <label
              key={cat.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                color: selectedCategory === cat.slug ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: selectedCategory === cat.slug ? 700 : 500
              }}
            >
              <input
                type="radio"
                name="catFilter"
                checked={selectedCategory === cat.slug}
                onChange={() => onSelectCategory(cat.slug)}
                style={{ accentColor: 'var(--primary-blue)', width: '16px', height: '16px' }}
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Storage Filter */}
      <div style={{ marginBottom: '28px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Storage Capacity
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {storageOptions.map((st) => {
            const isSelected = (st === 'All' && !selectedStorage) || selectedStorage === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => onSelectStorage(st === 'All' ? '' : st)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--primary-blue)' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? 'var(--primary-blue)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  boxShadow: isSelected ? 'var(--shadow-blue)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Max Price
          </h4>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
            Rs. {Number(priceRange).toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="10000"
          max="600000"
          step="10000"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--primary-blue)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>
          <span>Rs. 10,000</span>
          <span>Rs. 600,000+</span>
        </div>
      </div>

      {/* Stock Availability */}
      <div>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            style={{ accentColor: 'var(--primary-blue)', width: '18px', height: '18px' }}
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </aside>
  );
}
