import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { getMovieById } from "../../interfaces/interfacesHttp";
import styles from "./styles.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");
  console.log(backLinkRef);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const movieData = await getMovieById(movieId);
        setMovie(movieData);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {movie && !loading && !error && (
        <>
          <Link to={backLinkRef.current}>Go Back</Link>
          <div className={styles.wrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={styles.container}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <p>Release date: {movie.release_date}</p>
              <p>Rating: {movie.vote_average}</p>
            </div>
          </div>
        </>
      )}
      {movie && (
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      )}

      <Outlet />
    </div>
  );
}
