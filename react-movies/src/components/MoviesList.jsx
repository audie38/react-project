import PropTypes from "prop-types";
import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie key={movie.id} title={movie.title} releaseDate={movie.releaseDate} openingText={movie.openingText} />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array,
};

export default MovieList;
