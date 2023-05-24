import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="py-5">
      <div className="container d-flex justify-content-center">
        <div className="card p-5 d-flex flex-column align-items-center hero-card bg-light w-100">
          <h1 className="text-center mb-4">MERN</h1>
          <p className="text-center mb-4">This is a boilerplate for MERN Auth that stores a JWT in an HTTP-Only cookie. It also uses Redux Toolkit and the Bootstrap library</p>
          <div className="d-flex">
            <Link className="btn btn-primary me-3" to="/login">
              Sign In
            </Link>
            <Link className="btn btn-secondary" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
