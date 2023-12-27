import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";

const RegisterForm = () => {
  const navigate = useNavigate();

  const textValidation = (text) => {
    return text.trim() !== "";
  };
  const emailValidation = (text) => {
    return text.trim() !== "" && text.trim().includes("@");
  };
  const passwordValidation = (text) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/; //min 8 letter password, with at least a symbol, upper and lower case letters and a number
    return regex.test(text);
  };

  const { value: displayName, error: displayNameInvalid, valid: displayNameIsValid, inputChangeHandler: displayNameChangeHandler, inputBlurHandler: displayNameBlurHandler, reset: displayNameReset } = useInput(textValidation);
  const { value: username, error: usernameInvalid, valid: usernameIsValid, inputChangeHandler: usernameChangeHandler, inputBlurHandler: usernameBlurHandler, reset: usernameReset } = useInput(textValidation);
  const { value: email, error: emailInvalid, valid: emailIsValid, inputChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, reset: emailReset } = useInput(emailValidation);
  const { value: password, error: passwordInvalid, valid: passwordIsValid, inputChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler, reset: passwordReset } = useInput(passwordValidation);
  const {
    value: passwordConfirm,
    error: passwordConfirmInvalid,
    valid: passwordConfirmIsValid,
    inputChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    reset: passwordConfirmReset,
  } = useInput(passwordValidation);

  const passwordConfirmed = password === passwordConfirm && passwordIsValid && passwordConfirmIsValid;
  const formIsValid = displayNameIsValid && usernameIsValid && emailIsValid && passwordConfirmed;

  const clearForm = () => {
    displayNameReset();
    usernameReset();
    emailReset();
    passwordReset();
    passwordConfirmReset();
  };

  const submitRegister = (event) => {
    event.preventDefault();
    if (formIsValid) {
      if (confirm("Submit Registration ?")) {
        const newUserData = {
          displayName: displayName,
          username: username,
          email: email,
          password: password,
        };
        console.log("New User Data: ", newUserData);
        clearForm();
        navigate("/");
      }
    }
  };

  return (
    <>
      <form onSubmit={submitRegister}>
        <div className="mb-3">
          <label htmlFor="displayName" className="form-label">
            Full Name
          </label>
          <input type="text" className="form-control" id="displayName" value={displayName} onChange={displayNameChangeHandler} onBlur={displayNameBlurHandler} required />
          {displayNameInvalid && <p className="form-text text-danger text-capitalize">*Full Name Cannot be Empty</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input type="text" className="form-control" id="username" value={username} onChange={usernameChangeHandler} onBlur={usernameBlurHandler} required />
          {usernameInvalid && <p className="form-text text-danger text-capitalize">*Username Cannot be Empty</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" name="email" id="email" className="form-control" value={email} onChange={emailChangeHandler} onBlur={emailBlurHandler} required />
          {emailInvalid && <p className="form-text text-danger text-capitalize">*Email Cannot be Empty</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" name="password" id="password" className="form-control" value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} required />
          {passwordInvalid && <p className="form-text text-danger text-capitalize">*Password must contain at least 8 letter password, with at least a symbol, upper and lower case letters and a number</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="passwordConfirm" className="form-label">
            Confirm Password
          </label>
          <input type="password" name="passwordConfirm" id="passwordConfirm" className="form-control" value={passwordConfirm} onChange={passwordConfirmChangeHandler} onBlur={passwordConfirmBlurHandler} required />
          {passwordConfirmInvalid && <p className="form-text text-danger text-capitalize">*Password must contain at least 8 letter password, with at least a symbol, upper and lower case letters and a number</p>}
          {password !== passwordConfirm && <p className="form-text text-danger text-capitalize">*Password Confirmation do not match</p>}
        </div>
        <div className="mb-3">
          <button className="btn btn-dark w-100" type="submit">
            Register
          </button>
        </div>
      </form>
      <div className="my-3 text-center">
        <span>
          {`Already have an account ?`} <Link to="/login">Login Now</Link>
        </span>
      </div>
    </>
  );
};

export default RegisterForm;
