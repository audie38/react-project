import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useInput from "../../hooks/use-input";

import Alert from "../ui/Alert";

const LoginForm = () => {
  const error = useSelector((state) => state.notif.submitError);
  const isLoading = useSelector((state) => state.notif.isLoading);

  const textValidation = (text) => {
    return text.trim !== "";
  };

  const { value: account, error: accountInvalid, valid: accountIsValid, inputChangeHandler: accountChangeHandler, inputBlurHandler: accountBlurHandler, reset: accountInputReset } = useInput(textValidation);
  const { value: password, error: passwordInvalid, valid: passwordIsValid, inputChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler, reset: passwordInputReset } = useInput(textValidation);
  const formIsValid = accountIsValid && passwordIsValid;

  const resetFormInput = () => {
    accountInputReset();
    passwordInputReset();
  };
  const loginHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      const data = {
        account: account,
        password: password,
      };
      console.log("Data: ", data);
      resetFormInput();
    }
  };

  const formSubmitButton = isLoading ? (
    <button className="btn btn-secondary w-100" type="button" disabled>
      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
      <span role="status">Login</span>
    </button>
  ) : (
    <button type="submit" className="btn btn-dark w-100">
      Login
    </button>
  );

  return (
    <>
      {error && <Alert message={error} />}
      <form onSubmit={loginHandler}>
        <div className="mb-3">
          <label htmlFor="account" className="form-label">
            Username or Email Address
          </label>
          <input type="text" className="form-control" id="account" value={account} onChange={accountChangeHandler} onBlur={accountBlurHandler} disabled={isLoading} />
          {accountInvalid && <p className="form-text text-danger text-capitalize">*Invalid Account Username / Email</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} disabled={isLoading} />
          {passwordInvalid && <p className="form-text text-danger text-capitalize">*Invalid Password</p>}
        </div>
        <div className="mb-3">{formSubmitButton}</div>
      </form>
      <div className="my-3 text-center">
        {isLoading && (
          <>
            {`Don't have an account yet ?`} <span className="text-primary">Sign Up Here!</span>
          </>
        )}
        {!isLoading && (
          <span>
            {`Don't have an account yet ?`} <Link to="/register">Sign Up Here!</Link>
          </span>
        )}
      </div>
    </>
  );
};

export default LoginForm;
