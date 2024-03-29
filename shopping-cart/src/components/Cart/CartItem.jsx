import PropTypes from "prop-types";
import { useState, useContext } from "react";
import CartContext from "../../store/CartContext";

const CartItem = (props) => {
  const ctx = useContext(CartContext);
  const priceAmt = ctx.currencyFormatter(props.item?.price);
  const [cartItemQty, setCartItemQty] = useState(props.item.amount);
  const setCartItemQtyHandler = (event) => {
    const inputVal = event.target.value;
    if (inputVal > cartItemQty) {
      props.onAdd((inputVal - cartItemQty) * parseFloat(props.item?.price));
      ctx.onUpdateCartItem({
        ...props.item,
        amount: inputVal,
        restored: inputVal - cartItemQty,
      });
    } else {
      props.onMin((cartItemQty - inputVal) * parseFloat(props.item?.price));
      ctx.onUpdateCartItem({
        ...props.item,
        amount: inputVal,
        restored: cartItemQty - inputVal,
      });
    }
    if (inputVal >= props.item.stock) {
      setCartItemQty(props.item.stock);
    } else {
      setCartItemQty(inputVal);
    }
  };
  const addItemAmount = () => {
    if (cartItemQty + 1 <= props.item.stock) {
      ctx.onUpdateCartItem({
        ...props.item,
        amount: cartItemQty + 1,
        restored: -1,
      });
      setCartItemQty((prev) => prev + 1);
      props.onAdd(parseFloat(props.item?.price));
    }
  };
  const minItemAmount = () => {
    props.onMin(parseFloat(props.item?.price));
    if (cartItemQty - 1 >= 1) {
      ctx.onUpdateCartItem({
        ...props.item,
        amount: cartItemQty - 1,
        restored: 1,
      });
      setCartItemQty((prev) => prev - 1);
    } else {
      removeCartItem();
    }
  };
  const removeCartItem = () => {
    const data = {
      ...props.item,
      amount: cartItemQty,
    };
    props.onMin(cartItemQty * parseFloat(props.item?.price));
    ctx.onRemoveItemFromCart(data);
  };

  return (
    <li className="list-group-item border-bottom-0">
      <div className="row d-flex align-items-center">
        <div className="col-md-2">
          <img src={props.item.img} alt={props.item.name} className="img-thumbnail" />
        </div>
        <div className="col-md-6">
          <h4 className="my-2">{props.item.name}</h4>
          <h6>{priceAmt}</h6>
        </div>
        <div className="col-md-4">
          <div className="d-flex justify-content-between">
            <div className="input-group w-50">
              <button onClick={minItemAmount} className="btn btn-light">
                -
              </button>
              <input className="form-control text-center" type="number" value={cartItemQty} min={1} max={props.item.stock} onChange={setCartItemQtyHandler} />
              <button onClick={addItemAmount} className="btn btn-light">
                +
              </button>
            </div>
            <button onClick={removeCartItem} className="btn btn-light">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onMin: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
  item: {},
  onAdd: () => {},
  onMin: () => {},
};

export default CartItem;
