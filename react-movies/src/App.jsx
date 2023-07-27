import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetch("https://swapi.dev/api/films/", {
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
      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
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
    </React.Fragment>
  );
}

export default App;
