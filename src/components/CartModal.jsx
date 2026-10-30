import React from 'react';

export function CartModal({ isOpen, items, onClose, onUpdateQty, onClearCart }) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>🛒 Seu Carrinho</h3>
          <button className="close-btn" onClick={onClose}>Fechar ✕</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-state">
              <p>Seu carrinho está vazio.</p>
              <small>Adicione produtos do catálogo para continuar.</small>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span>
                    {(item.price * item.qty).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => {
                alert('Pedido finalizado com sucesso na TechStore (React)!');
                onClearCart();
                onClose();
              }}
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
