import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  const product = useSelector((state) => state.prod.products).filter((item) => parseInt(item.id) === parseInt(id))[0];
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const itemPrice = formatter.format(parseFloat(product?.price));
  return (
    <div className="row d-flex flex-column justify-content-between">
      <div className="col-md-6">
        <h1>{product.title}</h1>
        <p className="text-warning">{itemPrice}</p>
        <p>{product.description}</p>
      </div>
      <div className="col-md-6"></div>
    </div>
  );
};

export default ProductDetail;
