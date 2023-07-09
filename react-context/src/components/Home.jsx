import PropTypes from "prop-types";
import { useContext } from "react";
import CartContext from "../store/CartContext";

import MenuList from "./Menu/MenuList";
import Hero from "./UI/Hero";

export default function Home({ menu }) {
  const ctx = useContext(CartContext);
  return (
    <>
      <Hero />
      <MenuList data={menu} onAdd={ctx.updateCart} />
    </>
  );
}

Home.propTypes = {
  menu: PropTypes.array.isRequired,
};
