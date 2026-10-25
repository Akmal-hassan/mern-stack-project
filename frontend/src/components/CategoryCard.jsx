import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  const getCategoryLink = (slug) => {
    if (slug === 'iphone') return '/iphone';
    if (slug === 'samsung') return '/samsung';
    return `/shop?category=${slug}`;
  };

  return (
    <Link to={getCategoryLink(category.slug)} className="category-card">
      <div className="category-card-img-wrap">
        <img
          src={category.image}
          alt={category.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>
      <h4 className="category-card-title">{category.name}</h4>
      <span className="category-card-count">{category.itemCount}</span>
      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-blue)' }}>
        <span>Explore</span>
        <ArrowRight size={14} color="var(--primary-blue)" />
      </div>
    </Link>
  );
}
