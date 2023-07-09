import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const CartItem = ({ data, onUpdate, onUpdateCart }) => {
  const addItem = () => {
    onUpdate(parseFloat(data.price));
    setAddQtyHandler();
  };
  const removeItem = () => {
    onUpdate(parseFloat(-data.price));
    setRemoveQtyHandler();
  };

  const [itemQty, setItemQty] = useState(parseInt(data.qty));
  const setAddQtyHandler = () => {
    setItemQty((prevItem) => prevItem + 1);
  };
  const setRemoveQtyHandler = () => {
    setItemQty((prevItem) => prevItem - 1);
    if (itemQty - 1 <= 0) {
      setItemQty(0);
    }
  };

  useEffect(() => {
    const updatedObj = { ...data, qty: itemQty };
    onUpdateCart(updatedObj);
  }, [data, itemQty, onUpdateCart]);

  return (
    <li className="list-group-item border-danger">
      <div className="row d-flex flex-wrap align-items-center">
        <div className="col-xl-8 col-md-6">
          <h3 className="h3">{data.title}</h3>
          <p className="text-danger fw-bold d-inline me-5">$ {data.price}</p>
          <span className="badge text-bg-light px-3 py-2"> x{itemQty}</span>
        </div>
        <div className="col-xl-4 col-md-6 ms-auto">
          <button onClick={removeItem} className="btn btn-outline-danger rounded-1 px-5 mx-3">
            -
          </button>
          <button onClick={addItem} className="btn btn-outline-danger rounded-1 px-5">
            +
          </button>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onUpdateCart: PropTypes.func.isRequired,
};

export default CartItem;
