import PropTypes from "prop-types";
import ProductItem from "./ProductItem";

const ProductList = (props) => {
  return <div className="row">{props.products.length > 0 && props.products.map((prod) => <ProductItem key={prod.id} data={prod} />)}</div>;
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

ProductList.defaultProps = {
  products: [],
};

export default ProductList;
