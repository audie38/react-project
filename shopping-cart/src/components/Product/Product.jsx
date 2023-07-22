import ProductList from "./ProductList";
import PropTypes from "prop-types";

const Product = (props) => {
  return (
    <div>
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
