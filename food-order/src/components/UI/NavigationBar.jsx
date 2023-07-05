import Badge from "./Badge";

export default function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container">
        <a className="navbar-brand fw-bold fs-3" href="#">
          ReactMeals
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <a className="btn btn-danger rounded-5" href="#">
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Your Cart
              <Badge className={"ms-2"} displayText={0} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
