import classes from "./CartButton.module.css";

import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../store/product";

const CartButton = () => {
  const dispatch = useDispatch();
  const toggleShowCartHandler = () => {
    dispatch(productActions.showCart());
  };
  const cartItemCount = useSelector((state) => state.product.cart).length;

  return (
    <button className={classes.button} onClick={toggleShowCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemCount}</span>
    </button>
  );
};

export default CartButton;
