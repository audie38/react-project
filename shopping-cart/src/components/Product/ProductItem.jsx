import PropTypes from "prop-types";
import Card from "../UI/Card";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const priceAmt = `Rp ${props.data?.price.toFixed(2)}`;
  return (
    <Link to={`/product/${props.data?.id}`} className="col-xl-4 col-md-6 col-sm-12 my-3">
      <Card className="d-flex flex-column justify-content-between align-items-center text-end py-2 h-100">
        <img src={props.data?.img} alt={props.data?.name} className="card-img-top w-50 h-50 object-fit-contain" />
        <div className="card-body">
          <h4 className="h4 my-3">{props.data?.name}</h4>
          <span className="text-warning text-end fs-4">{priceAmt}</span>
        </div>
      </Card>
    </Link>
  );
};

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
};

ProductItem.defaultProps = {
  data: {},
};

export default ProductItem;
