import PropTypes from "prop-types";

import MenuList from "./Menu/MenuList";
import Hero from "./UI/Hero";

export default function Home({ menu, onAdd }) {
  return (
    <>
      <Hero />
      <MenuList data={menu} onAdd={onAdd} />
    </>
  );
}

Home.propTypes = {
  menu: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
};
