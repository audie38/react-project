import classes from "./CartItem.module.css";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const totalItemPrice = `$ ${(parseInt(props.item.quantity) * parseFloat(props.item.price)).toFixed(2)}`;
  const addItemQuantityHandler = () => {
    const updateVal = {
      productId: props.item.productId,
      quantity: 1,
    };
    dispatch(cartActions.updateCartItemQuantity(updateVal));
  };
  const minItemQuantityHandler = () => {
    const updateVal = {
      productId: props.item.productId,
      quantity: -1,
    };
    dispatch(cartActions.updateCartItemQuantity(updateVal));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{props.item.title}</h3>
        <div className={classes.price}>
          {totalItemPrice} <span className={classes.itemprice}>(${parseFloat(props.item.price).toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{props.item.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={minItemQuantityHandler}>-</button>
          <button onClick={addItemQuantityHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
