import PropTypes from "prop-types";

export default function AuthForm({ onLogin }) {
  const login = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <form onSubmit={login} className="container">
      <div className="mb-3">
        <div className="row">
          <div className="col-md-3">
            <label className="form-label" htmlFor="email">
              E-Mail
            </label>
          </div>
          <div className="col-md-9">
            <input className="form-control" type="email" name="email" id="email" />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row">
          <div className="col-md-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>
          <div className="col-md-9">
            <input className="form-control" type="password" name="password" id="password" />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-secondary w-100">
        Login
      </button>
    </form>
  );
}

AuthForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
