import React, { useState, useMemo } from 'react';
import { CATEGORIES, PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { CartModal } from './components/CartModal';

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [favorites, setFavorites] = useState([1]);
  const [cart, setCart] = useState([
    { ...PRODUCTS[0], qty: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleUpdateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div>
      <Header
        search={search}
        onSearchChange={setSearch}
        cartCount={totalCartItems}
        favCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="container">
        <section className="hero">
          <div className="hero-text">
            <h2>Hardware & Periféricos de Alta Performance</h2>
            <p>
              Projeto 01 desenvolvido com <strong>React 18</strong> utilizando Hooks
              (<code>useState</code>, <code>useMemo</code>), componentização modular e props.
            </p>
          </div>
          <div className="stats-row">
            <div className="stat-box">
              <strong>{PRODUCTS.length}</strong>
              <small>Produtos</small>
            </div>
            <div className="stat-box">
              <strong>{favorites.length}</strong>
              <small>Favoritos</small>
            </div>
            <div className="stat-box">
              <strong>{totalCartItems}</strong>
              <small>No Carrinho</small>
            </div>
          </div>
        </section>

        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          totalFound={filteredProducts.length}
        />

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h3>Nenhum produto encontrado</h3>
            <p>Tente ajustar os termos da busca ou selecionar outra categoria.</p>
          </div>
        ) : (
          <section className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={handleAddToCart}
              />
            ))}
          </section>
        )}
      </main>

      <CartModal
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onClearCart={() => setCart([])}
      />

      <footer className="footer">
        <div className="container">
          <p>SENAI — Atividade Comparativa de Frameworks Frontend • <strong>Projeto 01: React</strong></p>
        </div>
      </footer>
    </div>
  );
}
