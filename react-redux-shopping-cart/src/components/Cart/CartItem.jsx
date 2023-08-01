import classes from "./CartItem.module.css";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { productActions } from "../../store/product";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const totalItemPrice = `$ ${(props.item.quantity * props.item.price).toFixed(2)}`;
  const addItemQuantityHandler = () => {
    const updateVal = {
      id: props.item.id,
      quantity: 1,
    };
    dispatch(productActions.updateCartItemQuantity(updateVal));
  };
  const minItemQuantityHandler = () => {
    const updateVal = {
      id: props.item.id,
      quantity: -1,
    };
    dispatch(productActions.updateCartItemQuantity(updateVal));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{props.item.title}</h3>
        <div className={classes.price}>
          {totalItemPrice} <span className={classes.itemprice}>(${props.item.price.toFixed(2)}/item)</span>
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
