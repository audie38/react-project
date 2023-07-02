import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function AuthForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const login = (e) => {
    e.preventDefault();
    const credential = {
      email,
      password,
    };
    if (isFormValid) {
      onLogin(credential);
    }
  };

  useEffect(() => {
    setIsFormValid(email.includes("@") && password.trim().length > 6);
    return () => {};
  }, [email, password]);

  return (
    <>
      <form onSubmit={login} className="container my-3">
        <div className="mb-3">
          <div className="row">
            <div className="col-md-3">
              <label className="form-label fw-bold" htmlFor="email">
                E-Mail
              </label>
            </div>
            <div className="col-md-9">
              <input className="form-control" type="email" name="email" id="email" value={email} onChange={emailChangeHandler} />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-3">
              <label className="form-label fw-bold" htmlFor="password">
                Password
              </label>
            </div>
            <div className="col-md-9">
              <input className="form-control" type="password" name="password" id="password" value={password} onChange={passwordChangeHandler} />
            </div>
          </div>
        </div>
        <button disabled={!isFormValid} type="submit" className="btn btn-secondary w-100 rounded-4">
          Login
        </button>
      </form>
    </>
  );
}

AuthForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
