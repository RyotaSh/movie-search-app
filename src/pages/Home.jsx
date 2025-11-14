import Chat from "../components/Chat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';


export default function Home() {
  const [query, setQuery] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]); 
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setMovies([]); 

    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setError("No movies found.");
      } else {
        setMovies(data.results);
      }
    } catch (err) {
      console.error(err);
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="container">
      {movies.length === 0 && !query && !loading && !error && (
        <h1 className="welcome-text">Welcome! Search for a movie to get started.</h1>
      )}

      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter movie title"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <p className="movie-title">{movie.title}</p>
            <p className="movie-year">{movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>
          </div>
        ))}
      </div>
      <Chat />
    </div>
  );
}
