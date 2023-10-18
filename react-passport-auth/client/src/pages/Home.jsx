import PropTypes from "prop-types";
import PostList from "../components/post/PostList";

const Home = (props) => {
  return (
    <div className="home">
      <PostList data={props.data} />
    </div>
  );
};

Home.propTypes = {
  data: PropTypes.array.isRequired,
};

Home.defaultProps = {
  data: [],
};

export default Home;
