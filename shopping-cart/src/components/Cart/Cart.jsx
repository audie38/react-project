import Card from "../UI/Card";
import CartItem from "./CartItem";
import PropTypes from "prop-types";

const Cart = (props) => {
  return (
    <div className="row">
      <div className="col-md-8">
        <Card className={"p-3"}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item border-bottom-0">
              <h1>Cart</h1>
            </li>
            {props.data.map((item) => (
              <CartItem key={item.id} item={item} removeItem={props.removeItem} />
            ))}
          </ul>
        </Card>
      </div>
      <div className="col-md-4">
        <Card className={"p-3"}>
          <h1>Summary</h1>
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
