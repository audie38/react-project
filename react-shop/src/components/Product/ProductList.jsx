import { Fragment } from "react";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const productData = useSelector((state) => state.prod.products);
  return (
    <Fragment>
      <div className="row d-flex justify-content-center align-items-center">
        {productData.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </Fragment>
  );
};

export default ProductList;
