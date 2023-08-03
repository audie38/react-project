import { NavLink } from "react-router-dom";

const NavBar = () => {
  const cartItemCount = 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          React Shop
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <NavLink to="/product" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Product
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="mx-2">Cart</span>
              <span className="badge text-bg-danger">{cartItemCount}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
