import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import MovieCard from "./components/MovieCard";
import Loading from "./components/Loading";
import MovieDetails from "./pages/MovieDetails";

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovies = async () => {
    if (search.trim().length < 3) {
      alert("Please enter at least 3 characters to search for movies.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${search}`,
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search.slice(0, 6));
      } else {
        setMovies([]);
        alert(data.Error);
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sort movies by year
  const handleSort = (event) => {
    const sortValue = event.target.value;

    const sortedMovies = [...movies].sort((a, b) => {
      if (sortValue === "newest") {
        return Number(b.Year) - Number(a.Year);
      }

      if (sortValue === "oldest") {
        return Number(a.Year) - Number(b.Year);
      }

      return 0;
    });

    setMovies(sortedMovies);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar__container">
          <a href="/" className="navbar__logo">
            Movie Source
          </a>

          <span className="navbar__text">Movie Search</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <h1>Find Your Next Movie</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                getMovies();
              }
            }}
          />

          <button onClick={getMovies}>Search</button>
        </div>

        <select className="sort-select" onChange={handleSort} defaultValue="">
          <option value="" disabled>
            Sort by...
          </option>

          <option value="newest">Newest to Oldest</option>

          <option value="oldest">Oldest to Newest</option>
        </select>

        {loading && <Loading />}

        {!loading && movies.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__logo">Movie Source</div>

          <p>© 2026 Movie Source. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:imdbID" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
