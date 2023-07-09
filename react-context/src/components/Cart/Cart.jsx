import PropTypes from "prop-types";
import CartList from "./CartList";

const Cart = ({ onHide, data, onUpdateItem }) => {
  return (
    <div className="container my-5">
      <CartList data={data} onClose={onHide} onUpdateItem={onUpdateItem} />
    </div>
  );
};

Cart.propTypes = {
  onHide: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default Cart;
