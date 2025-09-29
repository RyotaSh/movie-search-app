import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        const data = await response.json();
        if (data.success === false) {
          setError("Movie not found.");
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        Back
      </button>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p><strong>Year:</strong> {movie.release_date?.slice(0, 4) || "N/A"}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p>{movie.overview}</p>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              style={{ borderRadius: "8px", marginTop: "20px" }}
            />
          )}
        </>
      )}
    </div>
  );
}
