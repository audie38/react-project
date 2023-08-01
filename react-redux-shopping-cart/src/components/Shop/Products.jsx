import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = () => {
  const productItem = [
    {
      id: 1,
      title: "Test",
      price: 6,
      description: "This is a first product - amazing!",
    },
    {
      id: 2,
      title: "Another Test",
      price: 8,
      description: "This is the second product - amazing!",
    },
  ];
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
