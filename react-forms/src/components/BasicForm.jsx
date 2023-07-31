import useInput from "../hooks/use-input";

const BasicForm = () => {
  const textValidation = (text) => {
    return text.trim() !== "";
  };
  const emailValidation = (addr) => {
    return addr.trim() !== "" && addr.includes("@");
  };

  const { value: firstName, error: firstNameInvalid, valid: firstNameIsValid, inputChangeHandler: firstNameChangeHandler, inputBlurHandler: firstNameBlurHandler, clear: firstNameClearHandler } = useInput(textValidation);
  const { value: lastName, error: lastNameInvalid, valid: lastNameIsValid, inputChangeHandler: lastNameChangeHandler, inputBlurHandler: lastNameBlurHandler, clear: lastNameClearHandler } = useInput(textValidation);
  const { value: email, error: emailInvalid, valid: emailIsValid, inputChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, clear: emailClearHandler } = useInput(emailValidation);

  let formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  let firstNameClass = firstNameInvalid ? "form-control invalid" : "form-control";
  let lastNameClass = lastNameInvalid ? "form-control invalid" : "form-control";
  let emailClass = emailInvalid ? "form-control invalid" : "form-control";

  const submitForm = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const data = {
      firstName,
      lastName,
      email,
    };

    console.log(data);
    firstNameClearHandler();
    lastNameClearHandler();
    emailClearHandler();
  };

  return (
    <form onSubmit={submitForm}>
      <div className="control-group">
        <div className={firstNameClass}>
          <label htmlFor="name">First Name</label>
          <input type="text" id="name" value={firstName} onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} />
          {firstNameInvalid && <p className="error-text">First Name must not be empty</p>}
        </div>
        <div className={lastNameClass}>
          <label htmlFor="name">Last Name</label>
          <input type="text" id="name" value={lastName} onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} />
          {lastNameInvalid && <p className="error-text">Last Name must not be empty</p>}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor="email">E-Mail Address</label>
        <input type="email" id="email" value={email} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
        {emailInvalid && <p className="error-text">Invalid Email Address</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
