import { useState } from "react";

const useInput = (validate) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validate(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const enteredValueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const enteredValueBlurHandler = () => {
    setIsTouched(true);
  };

  const clearValueHandler = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    error: hasError,
    valid: valueIsValid,
    inputChangeHandler: enteredValueChangeHandler,
    inputBlurHandler: enteredValueBlurHandler,
    clear: clearValueHandler,
  };
};

export default useInput;
