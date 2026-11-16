import { Link } from "react-router-dom";
const Navbar = ({ cartCount, onToggleCart }) => {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        VinylVault
      </Link>

      <nav>
        <Link to="/">Catalog</Link>

        <button onClick={onToggleCart}>Cart ({cartCount})</button>
      </nav>
    </header>
  );
};

export default Navbar;
