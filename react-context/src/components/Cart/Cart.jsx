import { useContext } from "react";
import PropTypes from "prop-types";
import CartContext from "../../store/CartContext";

import CartList from "./CartList";

const Cart = ({ onClose }) => {
  const ctx = useContext(CartContext);

  return (
    <div className="container my-5">
      <CartList data={ctx.items} onClose={onClose} onUpdateItem={ctx.filterCart} />
    </div>
  );
};

Cart.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Cart;
