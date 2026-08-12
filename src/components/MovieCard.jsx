import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      {movie.Poster !== "N/A" ? (
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      ) : (
        <div className="movie-poster movie-poster--empty">No Poster</div>
      )}

      <div className="movie-info">
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
