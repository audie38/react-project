import PropTypes from "prop-types";

const Modal = ({ msg, title, type, onConfirm }) => {
  return (
    <>
      <div className="backdrop"></div>
      <div className="modal">
        <div className={`modal-header ${type}`}>
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          <p>{msg}</p>
        </div>
        <div className={`modal-footer ${type}`}>
          <button onClick={onConfirm} className="btn btn-close" type="button">
            Close
          </button>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  type: "primary",
};

export default Modal;
