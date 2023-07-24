import ProductList from "./ProductList";
import Carousel from "../UI/Carousel";
import PropTypes from "prop-types";

const Product = (props) => {
  return (
    <div>
      <Carousel data={props.data} />
      <ProductList products={props.data} onAddToCart={props.onAddToCart} />
    </div>
  );
};

Product.propTypes = {
  data: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

Product.defaultProps = {
  data: [],
  onAddToCart: () => {},
};

export default Product;
