import PropTypes from "prop-types";

import Hero from "./Hero";
import MenuList from "./menu/MenuList";

export default function Home({ data }) {
  return (
    <>
      <Hero />
      <div className="container mt-n6 mb-5">
        <MenuList data={data} />
      </div>
    </>
  );
}

Home.propTypes = {
  data: PropTypes.array.isRequired,
};

Home.defaultProps = {
  data: [],
};
