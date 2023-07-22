import ProductList from "./ProductList";
import data from "../../assets/data.json";
import { useState } from "react";

const Product = () => {
  const [productData, setProductData] = useState([...data]);

  const updateProductData = (prod) => {
    const existingProdIdx = productData.findIndex((item) => item.id === prod.id);
    const existingProd = productData[existingProdIdx];
    let updatedList = [];
    if (!existingProd) {
      let updatedProd;
      if (existingProd.stock === 1) {
        updatedList = productData.filter((item) => item.id !== prod.id);
      } else {
        updatedProd = { ...existingProd, stock: existingProd.stock - prod.amount };
        updatedList = [...productData];
        updatedList[existingProdIdx] = updatedProd;
      }
      setProductData(updatedList);
    }
  };

  return (
    <div>
      <ProductList products={productData} onAddToCart={updateProductData} />
    </div>
  );
};

export default Product;
