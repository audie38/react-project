import PropTypes from "prop-types";
import Card from "../UI/Card";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const priceAmt = formatter.format(props.data?.price.toFixed(2));
  return (
    <div className="col-xl-4 col-md-6 col-sm-12 my-3">
      <Card className="py-2 h-100 d-flex flex-column justify-content-center">
        <Link to={`/product/${props.data?.slug}`} className="d-flex flex-column justify-content-between align-items-center ">
          <img src={props.data?.img} alt={props.data?.name} className="card-img-top w-50 h-50 object-fit-contain" />
          <div className="card-body">
            <h4 className="h4 text-center my-3">{props.data?.name}</h4>
            <h4 className="h4 text-warning text-end">{priceAmt}</h4>
          </div>
        </Link>
        <div className="d-flex justify-content-center mx-3">
          {props.data?.stock > 0 ? (
            <button className="btn btn-danger w-100">Add To Cart</button>
          ) : (
            <button className="btn btn-secondary w-100" disabled>
              Add To Cart
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
};

ProductItem.defaultProps = {
  data: {},
};

export default ProductItem;
