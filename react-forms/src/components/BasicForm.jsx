import PropTypes from "prop-types";
import { useState } from "react";

const BasicForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  let firstNameIsValid = firstName.trim() !== "";
  let firstNameInvalid = !firstNameIsValid && firstNameTouched;
  let lastNameIsValid = lastName.trim() !== "";
  let lastNameInvalid = !lastNameIsValid && lastNameTouched;
  let emailIsValid = email.trim() !== "" && email.includes("@");
  let emailInvalid = !emailIsValid && emailTouched;
  let formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  let firstNameClass = firstNameInvalid ? "form-control invalid" : "form-control";
  let lastNameClass = lastNameInvalid ? "form-control invalid" : "form-control";
  let emailClass = emailInvalid ? "form-control invalid" : "form-control";

  const setFirstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };
  const setFirstNameBlurHandler = () => {
    setFirstNameTouched(true);
  };
  const setLastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };
  const setLastNameBlurHandler = () => {
    setLastNameTouched(true);
  };
  const setEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const setEmailBlurHandler = () => {
    setEmailTouched(true);
  };
  const submitForm = (event) => {
    event.preventDefault();
    setFirstNameTouched(true);
    setLastNameTouched(true);
    setEmailTouched(true);
    if (!formIsValid) {
      return;
    }
    const data = {
      firstName,
      lastName,
      email,
    };

    console.log(data);
    setFirstName("");
    setLastName("");
    setEmail("");
    setFirstNameTouched(false);
    setLastNameTouched(false);
    setEmailTouched(false);
  };

  return (
    <form onSubmit={submitForm}>
      <div className="control-group">
        <div className={firstNameClass}>
          <label htmlFor="name">First Name</label>
          <input type="text" id="name" value={firstName} onChange={setFirstNameChangeHandler} onBlur={setFirstNameBlurHandler} />
          {firstNameInvalid && <p className="error-text">First Name must not be empty</p>}
        </div>
        <div className={lastNameClass}>
          <label htmlFor="name">Last Name</label>
          <input type="text" id="name" value={lastName} onChange={setLastNameChangeHandler} onBlur={setLastNameBlurHandler} />
          {lastNameInvalid && <p className="error-text">Last Name must not be empty</p>}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor="email">E-Mail Address</label>
        <input type="email" id="email" value={email} onChange={setEmailChangeHandler} onBlur={setEmailBlurHandler} />
        {emailInvalid && <p className="error-text">Invalid Email Address</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} onClick={props.submit}>
          Submit
        </button>
      </div>
    </form>
  );
};

BasicForm.propTypes = {
  submit: PropTypes.func,
};

export default BasicForm;
