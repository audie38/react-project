import ProductItem from "./ProductItem";
import { useContext } from "react";
import CartContext from "../../store/CartContext";

const ProductList = () => {
  const ctx = useContext(CartContext);
  return <div className="row">{ctx.products.length > 0 && ctx.products.map((prod) => <ProductItem key={prod.id} data={prod} />)}</div>;
};

export default ProductList;
