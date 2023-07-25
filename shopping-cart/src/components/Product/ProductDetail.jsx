import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../../store/CartContext";

const ProductDetail = () => {
  const ctx = useContext(CartContext);
  const productId = useParams().slug;
  const product = ctx.products.filter((item) => item.slug === productId)[0];
  const priceAmt = ctx.currencyFormatter(product?.price);
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

  const qtyChangeHandler = (event) => {
    const inputVal = event.target.value;
    if (inputVal > product?.stock) {
      setQty(product.stock);
    } else {
      setQty(inputVal);
    }
  };

  const addItem = () => {
    const data = {
      ...product,
      amount: qty,
    };
    ctx.onAddToCart(data);
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
                  <div className="input-group w-50">
                    <button onClick={minQtyHandler} disabled={isDisabled} className="btn btn-light">
                      -
                    </button>
                    <input disabled={isDisabled} className="form-control text-center" type="number" min={1} max={product.stock} value={qty} onChange={qtyChangeHandler} />
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
                    <button onClick={addItem} className="btn btn-danger w-100">
                      Add To Cart
                    </button>
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

export default ProductDetail;
