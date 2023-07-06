import PropTypes from "prop-types";
import Badge from "./Badge";

export default function NavigationBar({ onShow, itemCount }) {
  return (
    <nav className="navbar navbar-expand-lg bg-danger navbar-dark">
      <div className="container">
        <a className="navbar-brand fs-3 fw-bold" href="/">
          ReactMeals
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <button onClick={onShow} className="btn btn-light text-danger rounded-5">
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Cart
              <Badge className={"ms-2"} text={itemCount} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

NavigationBar.propTypes = {
  onShow: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
};
