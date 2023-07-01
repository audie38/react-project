import { useState } from "react";
import PropTypes from "prop-types";

const Calculator = ({ onCalculate }) => {
  const [currSave, setCurrSave] = useState(0);
  const [yearSave, setYearSave] = useState(0);
  const [yearRate, setYearRate] = useState(0);
  const [duration, setDuration] = useState(0);

  const currSaveHandler = (event) => {
    setCurrSave(event.target.value);
  };

  const yearSaveHandler = (event) => {
    setYearSave(event.target.value);
  };

  const yearRateHandler = (event) => {
    setYearRate(event.target.value);
  };

  const durationHandler = (event) => {
    setDuration(event.target.value);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setCurrSave(0);
    setYearSave(0);
    setYearRate(0);
    setDuration(0);
    onCalculate({});
  };

  const submitCalculate = (e) => {
    e.preventDefault();
    const calculatorInputData = {
      currSave: +currSave,
      yearSave: +yearSave,
      yearRate: +yearRate,
      duration: +duration,
    };

    onCalculate(calculatorInputData);
  };

  return (
    <section className="user-input">
      <form>
        <div className="user-input-group">
          <div className="input-group">
            <label htmlFor="currSaving">CURRENT SAVINGS ($)</label>
            <input type="number" id="currSaving" value={currSave} onChange={currSaveHandler} />
          </div>
          <div className="input-group">
            <label htmlFor="yearlySaving">YEARLY SAVINGS ($)</label>
            <input type="number" id="yearlySaving" value={yearSave} onChange={yearSaveHandler} />
          </div>
          <div className="input-group">
            <label htmlFor="expInterest">EXPECTED INTEREST (%, PER YEAR)</label>
            <input type="number" id="expInterest" value={yearRate} onChange={yearRateHandler} />
          </div>
          <div className="input-group">
            <label htmlFor="invDuration">INVESTMENT DURATION (YEAR)</label>
            <input type="number" id="invDuration" value={duration} onChange={durationHandler} />
          </div>
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-reset" onClick={resetForm}>
            Reset
          </button>
          <button type="submit" className="btn btn-calculate" onClick={submitCalculate}>
            Calculate
          </button>
        </div>
      </form>
    </section>
  );
};

Calculator.propTypes = {
  onCalculate: PropTypes.func.isRequired,
};

export default Calculator;
