import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="py-3">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            React Events
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link to="/event" className="btn btn-danger px-3">
                New Event
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
