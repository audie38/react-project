import PropTypes from "prop-types";
import { useState, useEffect, useReducer } from "react";

const emailReducer = (state, action) => {
  if (action.type === "EMAIL_VALUE") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_VALUE") {
    return { value: action.val, isValid: action.val.length > 6 };
  }
  return { value: "", isValid: false };
};

export default function AuthForm({ onLogin }) {
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: false });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: "", isValid: false });
  const [isFormValid, setIsFormValid] = useState(false);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "EMAIL_VALUE",
      val: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "PASSWORD_VALUE",
      val: event.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    const credential = {
      email: emailState.value,
      password: passwordState.value,
    };
    if (isFormValid) {
      onLogin(credential);
    }
  };

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    setIsFormValid(emailIsValid && passwordIsValid);
    return () => {};
  }, [emailIsValid, passwordIsValid]);

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
              <input className="form-control" type="email" name="email" id="email" value={emailState.value} onChange={emailChangeHandler} />
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
              <input className="form-control" type="password" name="password" id="password" value={passwordState.value} onChange={passwordChangeHandler} />
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
