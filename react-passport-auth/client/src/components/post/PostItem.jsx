import PropTypes from "prop-types";
import Card from "../ui/Card";

import { Link } from "react-router-dom";

const PostItem = ({ data }) => {
  const { id, img, title, desc } = data;
  return (
    <Card>
      <Link className="nav-link" to={`/post/${id}`}>
        <span className="title">{title}</span>
        <img className="img" src={img} alt={img.title} />
        <p className="desc">{desc}</p>
        <button className="cardButton">Read More</button>
      </Link>
    </Card>
  );
};

PostItem.propTypes = {
  data: PropTypes.object.isRequired,
};

PostItem.defaultProps = {
  data: {},
};

export default PostItem;
