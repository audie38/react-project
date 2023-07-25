import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../store/CartContext";

const Navbar = () => {
  const ctx = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand text-uppercase" to="/">
          React Store
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="mx-2">Cart</span>
              <span className="badge rounded-pill text-bg-danger">{ctx.cartItemCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
