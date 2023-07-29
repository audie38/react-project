import PropTypes from "prop-types";

const SimpleInput = (props) => {
  return (
    <form>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div className="form-actions">
        <button onClick={props.submit}>Submit</button>
      </div>
    </form>
  );
};

SimpleInput.propTypes = {
  submit: PropTypes.func,
};

export default SimpleInput;
