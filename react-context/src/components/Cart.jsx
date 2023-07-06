import PropTypes from "prop-types";
import Card from "./UI/Card";

const Cart = ({ onHide, onUpdate, data }) => {
  return (
    <div className="container my-5">
      <button onClick={onHide} className="btn btn-danger w-25">
        &larr;
      </button>
      <Card>
        <h1></h1>
      </Card>
    </div>
  );
};

Cart.propTypes = {
  onHide: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default Cart;
