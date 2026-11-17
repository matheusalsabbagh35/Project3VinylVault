import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import CatalogPage from "./pages/CatalogPage";
import AlbumPage from "./pages/AlbumPage";
import CheckoutPage from "./pages/CheckoutPage";
import { ALBUMS } from "./data/albums";

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add an album to the cart
  const addToCart = (album, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === album.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === album.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prevCart, { ...album, quantity }];
    });

    setIsCartOpen(true);
  };

  // Update album amount in the cart
  const updateQuantity = (albumId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === albumId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  // Remove from the cart
  const removeFromCart = (albumId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== albumId));
  };

  // Clear the cart after checkout
  const clearCart = () => {
    setCart([]);
  };

  // Total number of items
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<CatalogPage albums={ALBUMS} onAddToCart={addToCart} />}
          />

          <Route
            path="/album/:albumId"
            element={<AlbumPage albums={ALBUMS} onAddToCart={addToCart} />}
          />

          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} onClearCart={clearCart} />}
          />
        </Routes>
      </main>

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;
