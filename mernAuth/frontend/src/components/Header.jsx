import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          MERN
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/login">
              <FaSignInAlt /> Sign In
            </Link>
            <Link className="nav-link" to="/register">
              <FaSignOutAlt /> Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
