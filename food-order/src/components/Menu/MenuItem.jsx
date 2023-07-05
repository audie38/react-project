import PropTypes from "prop-types";

const MenuItem = ({ menu }) => {
  return (
    <div className="list-group-item p-3">
      <div className="row">
        <div className="col-md-9">
          <h3>{menu.title}</h3>
          <p className="fst-italic">{menu.desc}</p>
          <p className="text-warning">$ {menu.price}</p>
        </div>
        <div className="col-md-3">
          <div className="d-flex">
            <label htmlFor="amount" className="fw-bold">
              Amount
            </label>
            <input placeholder="1" className="text-center ms-2 w-75" type="number" id="amount" />
          </div>
          <button className="btn btn-danger rounded-5 w-100 mt-2">+ Add</button>
        </div>
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  menu: PropTypes.object.isRequired,
};

MenuItem.defaultProps = {
  menu: {},
};

export default MenuItem;
