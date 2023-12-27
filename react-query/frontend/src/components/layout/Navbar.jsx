import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, oauthUserLogout } from "../../store/auth/authActions";
import { useEffect } from "react";

const Navbar = () => {
  // const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = !isNaN(loggedInUser?.userId);

  const loggedOutHandler = () => {
    if (confirm("Logout ?")) {
      dispatch(oauthUserLogout());
      dispatch(logoutUser());
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

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
