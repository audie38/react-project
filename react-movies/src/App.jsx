import React, { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

const BASE_API_URL = `${import.meta.env.VITE_API_BASE_URL}/films/`;

function App() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [movies, setMovies] = useState([]);
  const showAddMoviesPage = () => {
    setToggleMenu(true);
  };
  const hideAddMoviesPage = () => {
    setToggleMenu(false);
  };

  const transformData = (tasksObj) => {
    const data = tasksObj?.data.map((movieData) => {
      return {
        id: movieData.id,
        title: movieData.title,
        openingText: movieData.openingText,
        releaseDate: new Date(movieData.releaseDate).toLocaleDateString(),
      };
    });
    setMovies(data);
  };
  const { isLoading, error, sendRequest } = useHttp();

  const fetchMoviesHandler = () => {
    hideAddMoviesPage();
    sendRequest(
      BASE_API_URL,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  };

  const onAddMovie = async (mv) => {
    const addMovieConfig = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mv),
    };
    sendRequest(BASE_API_URL, addMovieConfig);
  };

  useEffect(() => {
    sendRequest(
      BASE_API_URL,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  }, [sendRequest]);

  let content = (
    <>
      {error ? (
        <section>
          <p>{error}</p>
        </section>
      ) : (
        <section>
          {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
          {!isLoading && movies.length === 0 && <p>Found no movies</p>}
          {isLoading && <p>Loading...</p>}
        </section>
      )}
    </>
  );

  if (toggleMenu) {
    content = (
      <section>
        <AddMovie onAddMovie={onAddMovie} />
      </section>
    );
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={showAddMoviesPage}>Add Movies</button>
      </section>
      {content}
    </React.Fragment>
  );
}

export default App;
