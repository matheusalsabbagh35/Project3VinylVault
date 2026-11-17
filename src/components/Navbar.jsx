import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        VinylVault
      </Link>

      <nav>
        <Link to="/">Catalog</Link>

        <button onClick={onOpenCart}>Cart ({cartCount})</button>
      </nav>
    </header>
  );
};

export default Navbar;
