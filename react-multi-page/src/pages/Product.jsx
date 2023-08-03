import { Link } from "react-router-dom";
import Card from "../components/UI/Card";

const productData = [
  {
    id: 1,
    title: "Product 1",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero harum consequatur facere qui ratione pariatur!",
  },
  {
    id: 2,
    title: "Product 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil quaerat commodi possimus temporibus at dolore.",
  },
  {
    id: 3,
    title: "Product 3",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore quia veritatis itaque. Iusto, ipsam totam.",
  },
];

const Product = () => {
  return (
    <div>
      <div className="d-flex flex-column gap-3">
        <div className="row">
          {productData.map((product) => (
            <div key={product.id} className="col-md-4">
              <Card>
                <Link className="nav-link" to={`/product/${product.id}`}>
                  <h5>{product.title}</h5>
                  <p>{product.desc}</p>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
