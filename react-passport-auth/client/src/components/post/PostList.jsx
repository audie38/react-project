import PropTypes from "prop-types";
import PostItem from "./PostItem";

const PostList = (props) => {
  return (
    <>
      {props.data.map((item) => (
        <PostItem key={item.id} data={item} />
      ))}
    </>
  );
};

PostList.propTypes = {
  data: PropTypes.array.isRequired,
};

PostList.defaultProps = {
  data: [],
};

export default PostList;
