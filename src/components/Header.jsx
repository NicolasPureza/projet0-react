import React from 'react';

export function Header({ search, onSearchChange, cartCount, favCount, onOpenCart }) {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="brand">
          <span className="brand-badge">REACT 18</span>
          <h1>Tech<span>Store</span></h1>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar hardware, periféricos, monitores..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="header-actions">
          <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            ❤️ {favCount} Favoritos
          </span>
          <button className="cart-btn" onClick={onOpenCart}>
            🛒 Carrinho <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
