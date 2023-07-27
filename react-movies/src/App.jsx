import React, { useCallback, useEffect, useState } from "react";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  const showAddMoviesPage = () => {
    setToggleMenu(true);
  };

  const hideAddMoviesPage = () => {
    setToggleMenu(false);
  };

  const fetchMoviesHandler = useCallback(async () => {
    hideAddMoviesPage();
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}/films/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!result.ok) {
        throw new Error("Something went wrong");
      }
      const data = await result.json();
      const transformedData = data.data.map((movieData) => {
        return {
          id: movieData.id,
          title: movieData.title,
          openingText: movieData.openingText,
          releaseDate: new Date(movieData.releaseDate).toLocaleDateString(),
        };
      });
      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const onAddMovie = async (mv) => {
    try {
      const newMovie = await fetch(`${import.meta.env.VITE_API_BASE_URL}/films/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mv),
      });
      if (!newMovie.ok) {
        throw new Error("Failed to Add");
      }
      await newMovie.json();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

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
