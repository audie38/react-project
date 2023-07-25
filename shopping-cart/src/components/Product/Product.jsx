import ProductList from "./ProductList";
import Carousel from "../UI/Carousel";
import { useContext } from "react";
import CartContext from "../../store/CartContext";

const Product = () => {
  const ctx = useContext(CartContext);
  return (
    <div>
      <Carousel data={ctx.products} />
      <ProductList />
    </div>
  );
};

export default Product;
