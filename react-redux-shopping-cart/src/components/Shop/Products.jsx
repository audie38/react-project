import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useSelector } from "react-redux";

const Products = () => {
  const productItem = useSelector((state) => state.product.product);

  const listProduct = (
    <ul>
      {productItem.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </ul>
  );
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {listProduct}
    </section>
  );
};

export default Products;
