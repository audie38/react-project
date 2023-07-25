import { useState, useContext } from "react";
import Card from "../UI/Card";
import CartItem from "./CartItem";
import CartContext from "../../store/CartContext";

const Cart = () => {
  const ctx = useContext(CartContext);
  const getSum = (total, num) => {
    return parseFloat(total) + parseFloat(num);
  };
  const totalArr = parseFloat(ctx.carts.map((item) => item.price * item.amount).reduce(getSum, 0));
  const [totalCart, setTotalCart] = useState(totalArr);
  const addTotalCartHandler = (amount) => {
    setTotalCart((prev) => parseFloat(prev) + parseFloat(amount));
  };
  const minTotalCartHandler = (amount) => {
    if (totalCart - amount <= 0) {
      setTotalCart(0);
    } else {
      setTotalCart((prev) => parseFloat(prev) - parseFloat(amount));
    }
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <Card className={"p-3"}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item border-bottom-0">
              <h1>Cart</h1>
            </li>
            {ctx.carts.map((item) => (
              <CartItem key={item.id} item={item} onAdd={addTotalCartHandler} onMin={minTotalCartHandler} />
            ))}
          </ul>
        </Card>
      </div>
      <div className="col-md-4">
        <Card className={"p-3"}>
          <h1>Summary</h1>
          <h6 className="text-center">{ctx.currencyFormatter(totalCart)}</h6>
          <button className="btn btn-danger">Place Order</button>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
