import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const ProductDetail = (props) => {
  const productId = useParams().slug;
  const product = props.data.filter((item) => item.slug === productId)[0];
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const priceAmt = formatter.format(product?.price.toFixed(2));
  const isDisabled = product?.stock === 0;
  const [qty, setQty] = useState(0);

  const addQtyHandler = () => {
    if (qty + 1 <= product?.stock) {
      setQty((item) => item + 1);
    }
  };

  const minQtyHandler = () => {
    if (qty - 1 >= 0) {
      setQty((item) => item - 1);
    }
  };

  return (
    <>
      {product ? (
        <div className="row">
          <div className="col-xl-4 col-md-12 my-3">
            <img src={product.img} alt={product.name} className="img-thumbnail img-fluid" loading="lazy" />
          </div>
          <div className="col-xl-4 col-md-12 my-3">
            <h1>{product.name}</h1>
            <h3>{priceAmt}</h3>
            <p>{product.desc}</p>
          </div>
          <div className="col-xl-4 col-md-12 my-3">
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item fw-bold">Quantity</li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="input-group w-25">
                    <button onClick={minQtyHandler} disabled={isDisabled} className="btn btn-light">
                      -
                    </button>
                    <span disabled={isDisabled} className="form-control">
                      {qty}
                    </span>
                    <button onClick={addQtyHandler} disabled={isDisabled} className="btn btn-light">
                      +
                    </button>
                  </div>
                  <span>Stock Available:</span>
                  <span>{product.stock}</span>
                </li>
                <li className="list-group-item">
                  {isDisabled ? (
                    <button className="btn btn-secondary w-100" disabled>
                      Add To Cart
                    </button>
                  ) : (
                    <button className="btn btn-danger w-100">Add To Cart</button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="container text-center">
          <h1>404 | Page Not Found</h1>
        </div>
      )}
    </>
  );
};

ProductDetail.propTypes = {
  data: PropTypes.array.isRequired,
};

ProductDetail.defaultProps = {
  data: [],
};

export default ProductDetail;
