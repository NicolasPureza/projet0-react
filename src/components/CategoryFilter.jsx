import React from 'react';

export function CategoryFilter({ categories, selectedCategory, onSelectCategory, totalFound }) {
  return (
    <section className="filter-bar">
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
        Exibindo <strong>{totalFound}</strong> produto(s)
      </span>
    </section>
  );
}
