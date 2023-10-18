import Github from "../assets/github.png";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

const Login = () => {
  const githubLogin = () => {
    window.open(`${API_BASE_URL}/auth/github`, "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton github" onClick={githubLogin}>
            <img src={Github} alt="Github" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button className="submit" type="submit">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
