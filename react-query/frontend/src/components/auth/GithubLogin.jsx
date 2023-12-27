import { useSelector } from "react-redux";

const GithubLogin = () => {
  const API_BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const githubLogin = () => {
    window.open(`${API_BACKEND_URL}/auth/github`, "_self");
  };
  const isLoading = useSelector((state) => state.notif.isLoading);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <button onClick={githubLogin} className="btn btn-dark w-100" disabled={isLoading}>
        <i className="fa-brands fa-github me-2"></i>
        Login with Github
      </button>
    </div>
  );
};

export default GithubLogin;
