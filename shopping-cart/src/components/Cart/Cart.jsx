import { useState } from "react";
import Card from "../UI/Card";
import CartItem from "./CartItem";
import PropTypes from "prop-types";

const Cart = (props) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const getSum = (total, num) => {
    return parseFloat(total) + parseFloat(num);
  };

  const totalArr = parseFloat(props.data.map((item) => item.price * item.amount).reduce(getSum, 0));
  const [totalCart, setTotalCart] = useState(totalArr);
  const addTotalCartHandler = (amount) => {
    setTotalCart((prev) => parseFloat(prev) + parseFloat(amount));
  };
  const minTotalCartHandler = (amount) => {
    setTotalCart((prev) => parseFloat(prev) - parseFloat(amount));
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <Card className={"p-3"}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item border-bottom-0">
              <h1>Cart</h1>
            </li>
            {props.data.map((item) => (
              <CartItem key={item.id} item={item} onAdd={addTotalCartHandler} onMin={minTotalCartHandler} removeItem={props.removeItem} />
            ))}
          </ul>
        </Card>
      </div>
      <div className="col-md-4">
        <Card className={"p-3"}>
          <h1>Summary</h1>
          <h6 className="text-center">{formatter.format(totalCart)}</h6>
          <button className="btn btn-danger">Place Order</button>
        </Card>
      </div>
    </div>
  );
};

Cart.propTypes = {
  data: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  data: [],
  removeItem: () => {},
};

export default Cart;
