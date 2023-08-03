import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "../UI/Card";

const ProductItem = (props) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const itemPrice = formatter.format(parseFloat(props.item.price));
  return (
    <div className="col-md-4">
      <Card className="d-flex justify-content-center align-items-center">
        <Link to={`/product/${props.item.id}`} className="nav-link">
          <h3 className="h3 text-center">{props.item.title}</h3>
          <p className="text-warning text-end">{itemPrice}</p>
        </Link>
      </Card>
    </div>
  );
};

ProductItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProductItem;
