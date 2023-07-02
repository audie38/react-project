import AuthContext from "../../store/auth-context";
import { useContext } from "react";

export default function NavigationBar() {
  const ctx = useContext(AuthContext);
  const logout = () => {
    ctx.onLogout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand fs-3 fw-bold" href="#">
          A Typical Page
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {ctx.isLoggedIn ? (
            <div className="navbar-nav ms-auto">
              <a className="nav-link" href="#">
                Users
              </a>
              <a className="nav-link" href="#">
                Admin
              </a>
              <a href="" onClick={logout} className="btn btn-danger rounded-5">
                Logout
              </a>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <a href="/" className="btn btn-danger rounded-5">
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
