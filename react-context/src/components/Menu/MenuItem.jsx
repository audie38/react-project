import PropTypes from "prop-types";
import { useState } from "react";

const MenuItem = ({ data, onAdd }) => {
  const [itemQty, setItemQty] = useState(1);

  const setItemQtyHandler = (event) => {
    setItemQty(event.target.value);
  };

  const addToCart = () => {
    const item = {
      id: data.id,
      title: data.title,
      qty: +itemQty,
      price: +data.price,
    };

    onAdd(item);
  };

  return (
    <li className="list-group-item py-3">
      <div className="row">
        <div className="col-md-9">
          <h3 className="fw-bold">{data.title}</h3>
          <p className="fst-italic">{data.desc}</p>
          <h5 className="text-warning">$ {data.price}</h5>
        </div>
        <div className="col-md-3">
          <div className="d-flex gap-2 align-items-center">
            <label htmlFor={`amount${data.id}`} className="form-label fw-bold">
              Amount
            </label>
            <input min={1} value={itemQty} onChange={setItemQtyHandler} className="form-control text-center" placeholder="1" type="number" name="amount" id={`amount${data.id}`} />
          </div>
          <button onClick={addToCart} className="btn btn-danger rounded-5 w-100 mt-2">
            + Add
          </button>
        </div>
      </div>
    </li>
  );
};

MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default MenuItem;
