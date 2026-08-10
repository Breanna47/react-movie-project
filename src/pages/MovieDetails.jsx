import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MovieDetails() {
  const { imdbID } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${imdbID}&plot=full`
        );

        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          console.error(data.Error);
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [imdbID]);

  if (loading) {
    return (
      <div className="details-page">
        <div className="details-loading">
          <div className="details-loading-poster"></div>

          <div className="details-loading-info">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-meta"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="details-page">
        <Link to="/" className="back-button">
          ← Back to Search
        </Link>

        <p>Movie details could not be found.</p>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-wrapper">

        <Link to="/" className="back-button">
          ← Back to Search
        </Link>

        <div className="movie-details">

          {/* LEFT SIDE — POSTER */}

          <div className="movie-details__poster">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Poster"
              }
              alt={movie.Title}
            />
          </div>

          {/* RIGHT SIDE — INFORMATION */}

          <div className="movie-details__content">

            <h1>{movie.Title}</h1>

            <div className="movie-details__meta">
              <span>{movie.Year}</span>
              <span>{movie.Rated}</span>
              <span>{movie.Runtime}</span>
            </div>

            <div className="movie-details__rating">
              ⭐ <strong>{movie.imdbRating}</strong>
              <span>/ 10 IMDb</span>
            </div>

            <section className="movie-details__section">
              <h2>Plot</h2>
              <p>{movie.Plot}</p>
            </section>

            <section className="movie-details__section">
              <h2>Movie Details</h2>

              <div className="movie-details__info-grid">

                <div>
                  <span>Genre</span>
                  <p>{movie.Genre}</p>
                </div>

                <div>
                  <span>Released</span>
                  <p>{movie.Released}</p>
                </div>

                <div>
                  <span>Director</span>
                  <p>{movie.Director}</p>
                </div>

                <div>
                  <span>Writer</span>
                  <p>{movie.Writer}</p>
                </div>

                <div>
                  <span>Actors</span>
                  <p>{movie.Actors}</p>
                </div>

                <div>
                  <span>Language</span>
                  <p>{movie.Language}</p>
                </div>

                <div>
                  <span>Country</span>
                  <p>{movie.Country}</p>
                </div>

                <div>
                  <span>Awards</span>
                  <p>{movie.Awards}</p>
                </div>

              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}

export default MovieDetails;