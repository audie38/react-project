import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Carousel(props) {
  const sliderData = props?.data?.slice(1, props.data.length - 1);
  return (
    <div id="carouselExample" className="carousel carousel-dark slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <Link to={`/product/${props.data[0].slug}`} className="carousel-item active">
          <img src={props.data[0].img} className="d-block w-100 object-fit-contain" alt={props.data[0].name} style={{ height: 300, objectFit: "cover" }} />
        </Link>
        {sliderData.map((item) => (
          <Link to={`/product/${item.slug}`} key={item.id} className="carousel-item ">
            <img src={item.img} className="d-block w-100 object-fit-contain" alt={item.name} style={{ height: 300, objectFit: "cover" }} />
          </Link>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

Carousel.propTypes = {
  data: PropTypes.array,
};
