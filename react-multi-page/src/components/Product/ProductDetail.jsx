import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/product");
  };

  return (
    <div>
      <div className="d-flex my-5">
        <button onClick={navigateHandler} className="btn btn-secondary ms-auto">
          <i className="fa-solid fa-arrow-left me-2"></i>
          Back
        </button>
      </div>
      ProductDetail of Product with Id: {id}
    </div>
  );
};

export default ProductDetail;
