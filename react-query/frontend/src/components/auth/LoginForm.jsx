import { Link } from "react-router-dom";
import useInput from "../../hooks/use-input";

const LoginForm = () => {
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

  return (
    <>
      <form onSubmit={loginHandler}>
        <div className="mb-3">
          <label htmlFor="account" className="form-label">
            Username or Email Address
          </label>
          <input type="text" className="form-control" id="account" value={account} onChange={accountChangeHandler} onBlur={accountBlurHandler} />
          {accountInvalid && <p className="form-text text-danger text-capitalize">*Invalid Account Username / Email</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
          {passwordInvalid && <p className="form-text text-danger text-capitalize">*Invalid Password</p>}
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </div>
      </form>
      <div className="my-3 text-center">
        <span>
          {`Don't have an account yet ?`} <Link to="/register">Sign Up Here!</Link>
        </span>
      </div>
    </>
  );
};

export default LoginForm;
