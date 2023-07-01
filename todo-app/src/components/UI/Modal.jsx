import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

const Backdrop = ({ onConfirm }) => {
  return <div className="backdrop" onClick={onConfirm}></div>;
};

const ModalOverlay = ({ msg, title, type, onConfirm }) => {
  return (
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
  );
};

const Modal = ({ msg, title, type, onConfirm }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onConfirm={onConfirm} />, document.getElementById("backdrop-root"))}
      {ReactDOM.createPortal(<ModalOverlay type={type} title={title} msg={msg} onConfirm={onConfirm} />, document.getElementById("modal-root"))}
    </React.Fragment>
  );
};

Backdrop.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

ModalOverlay.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

ModalOverlay.defaultProps = {
  type: "primary",
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
