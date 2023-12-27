import { Fragment } from "react";
import Navbar from "../components/layout/Navbar";

const Error = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container my-5 text-center">
        <h1>404 | Error Pages Not Found</h1>
      </div>
    </Fragment>
  );
};

export default Error;
