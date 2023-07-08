import PropTypes from "prop-types";
import Card from "../UI/Card";
import CartItem from "./CartItem";
import { useState } from "react";

const CartList = ({ data, onClose }) => {
  const cartItem = data.filter((item) => item.qty > 0);
  let initTotalPrice = 0;
  for (let item of cartItem) {
    initTotalPrice += item.price * item.qty;
  }

  initTotalPrice = parseFloat(initTotalPrice).toFixed(2);

  const [totalPrice, setTotalPrice] = useState(initTotalPrice);

  const setTotalPriceHandler = (itemPrice) => {
    setTotalPrice((prevTotal) => parseFloat(parseFloat(prevTotal) + parseFloat(itemPrice)).toFixed(2));
    if (parseFloat(totalPrice) + parseFloat(itemPrice) < 0) {
      setTotalPrice(0);
    }
  };

  return (
    <Card>
      <ul className="list-group list-group-flush border-danger d-flex justify-content-center">
        {cartItem.length > 0 ? cartItem.map((item) => <CartItem key={item.id} data={item} onUpdate={setTotalPriceHandler} />) : <h4></h4>}
        <li className="list-group-item my-3 border-0">
          <div className="row d-flex justify-content-between">
            <div className="col-md-10">
              <h3 className="h3 fw-bold">Total Amount</h3>
            </div>
            <div className="col-md-2">
              <h3 className="h3 fw-bold">$ {totalPrice}</h3>
            </div>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-end">
          <button onClick={onClose} className="btn btn-outline-danger rounded-5 mx-2 px-5">
            Close
          </button>
          <button className="btn btn-danger rounded-5 px-5">Order</button>
        </li>
      </ul>
    </Card>
  );
};

CartList.propTypes = {
  data: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartList;
