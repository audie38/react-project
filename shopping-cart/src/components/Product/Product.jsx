import ProductList from "./ProductList";
import Carousel from "../UI/Carousel";
import PropTypes from "prop-types";

const Product = (props) => {
  return (
    <div>
      <Carousel data={props.data} />
      <ProductList products={props.data} />
    </div>
  );
};

Product.propTypes = {
  data: PropTypes.array.isRequired,
};

Product.defaultProps = {
  data: [],
};

export default Product;
