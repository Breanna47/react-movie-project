import { Link } from "react-router-dom";
import { useState } from "react";

function MovieCard({ movie }) {
  const [posterError, setPosterError] = useState(false);

  const hasPoster = movie.Poster && movie.Poster !== "N/A" && !posterError;

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      {hasPoster ? (
        <img
          src={movie.Poster}
          alt={`${movie.Title} poster`}
          className="movie-poster"
          onError={() => setPosterError(true)}
        />
      ) : (
        <div className="movie-poster movie-poster--empty">
          No Poster Available
        </div>
      )}

      <div className="movie-info">
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
