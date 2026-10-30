import React from 'react';

export function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart }) {
  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return (
    <article className="product-card">
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-badge">{product.badge}</span>
        <button
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(product.id)}
          title="Favoritar produto"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="product-body">
        <div className="product-meta">
          <span>{product.category}</span>
          <span>⭐ {product.rating.toFixed(1)}</span>
        </div>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <span className="price">{formattedPrice}</span>
          <button className="add-btn" onClick={() => onAddToCart(product)}>
            + Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
