import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

const NavigationBar = ({ userData }) => {
  const logout = () => {
    if (confirm("Logout ?")) {
      window.open(`${API_BASE_URL}/auth/logout`, "_self");
    }
  };

  return (
    <div className="navbar">
      <NavLink to="/" className="logo">
        React Passport
      </NavLink>
      <ul className="list">
        {userData ? (
          <>
            <li to="/" className="listItem">
              <img src={userData?.photos[0].value} alt={userData?.displayName} className="avatar" />
            </li>
            <li to="/" className="listItem">
              {userData?.displayName}
            </li>
            <li onClick={logout} className="listItem">
              Logout
            </li>
          </>
        ) : (
          <NavLink to="/login" className="link">
            Login
          </NavLink>
        )}
      </ul>
    </div>
  );
};

NavigationBar.propTypes = {
  userData: PropTypes.object,
};

export default NavigationBar;
