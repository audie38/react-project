import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = false;

  const loggedOutHandler = () => {
    if (confirm("Logout ?")) {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          React Event
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                  Login
                  <i className="fa-solid fa-user ms-2"></i>
                </NavLink>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                    Event
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button onClick={loggedOutHandler} className="btn btn-danger active" type="button">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
