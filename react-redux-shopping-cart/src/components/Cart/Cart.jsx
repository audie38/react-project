import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.product.cart);

  const cartItemContent = (
    <ul>
      {cartItems.map((item) => (
        <CartItem key={item.productId} item={item} />
      ))}
    </ul>
  );

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {cartItems.length > 0 ? cartItemContent : <p>Cart Empty...</p>}
    </Card>
  );
};

export default Cart;
