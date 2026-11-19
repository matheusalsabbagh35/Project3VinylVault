import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-logo">
          VinylVault
        </Link>

        <nav className="nav-actions">
          <Link to="/" className="nav-link">
            Catalog
          </Link>

          <button className="btn-cart-badge" onClick={onOpenCart}>
            Cart <span className="badge-pill">{cartCount}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
