import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { clearCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

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
          <div className="navbar-nav ms-auto">
            {userInfo ? (
              <>
                <div className="nav-item dropdown">
                  <Link to="/profile" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {userInfo.name}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link onClick={logoutHandler} to="/" className="dropdown-item">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  <FaSignInAlt /> Sign In
                </Link>
                <Link className="nav-link" to="/register">
                  <FaSignOutAlt /> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
