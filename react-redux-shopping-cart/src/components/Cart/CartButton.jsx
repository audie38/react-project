import classes from "./CartButton.module.css";

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

const CartButton = () => {
  const dispatch = useDispatch();
  const toggleShowCartHandler = () => {
    dispatch(cartActions.showCart());
  };
  const cartItemCount = useSelector((state) => state.cart.cart).length;

  return (
    <button className={classes.button} onClick={toggleShowCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemCount}</span>
    </button>
  );
};

export default CartButton;
