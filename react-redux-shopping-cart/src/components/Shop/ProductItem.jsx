import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { productActions } from "../../store/product";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    const data = {
      productId: props.item.id,
      title: props.item.title,
      quantity: 1,
      price: props.item.price,
    };
    dispatch(productActions.addToCart(data));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{props.item.title}</h3>
          <div className={classes.price}>${props.item.price.toFixed(2)}</div>
        </header>
        <p>{props.item.description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

ProductItem.propTypes = {
  item: PropTypes.object,
};

export default ProductItem;
