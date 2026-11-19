import React from "react";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ cart, isOpen, onClose, onUpdateQuantity, onRemove }) => {
  const navigate = useNavigate();

  // Calculate the cart subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  // Do not render the drawer if it is not open
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Cart header */}
        <div className="drawer-header">
          <h2>Your Cart</h2>
          <button type="button" onClick={onClose}>
            X
          </button>
        </div>

        {/* Show the albums in the cart */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    className="cart-item-img"
                    src={item.image}
                    alt={item.title}
                  />

                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p>{item.artist}</p>
                    <p>${item.price.toFixed(2)}</p>

                    {/* Update album amount */}
                    <div className="qty-controls">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        disabled={item.quantity >= item.stock}
                        onClick={() => onUpdateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove album from cart */}
                    <button
                      className="btn-remove"
                      type="button"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart subtotal and checkout button */}
        <div className="drawer-footer">
          <div className="subtotal-row">
            <span>Subtotal:</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <button
            className="btn btn-primary btn-block"
            type="button"
            disabled={cart.length === 0}
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
