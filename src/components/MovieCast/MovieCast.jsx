import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCast } from "../../interfaces/interfacesHttp";
import styles from "./styles.module.css";
export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      try {
        const castData = await getMovieCast(movieId);
        setCast(castData.cast);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {!loading &&
        !error &&
        (cast.length > 0 ? (
          <ul className={styles.container}>
            {cast.map(({ id, name, character, profile_path }) => (
              <li key={id}>
                {profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                    alt={name}
                  />
                )}
                <p>
                  <strong>{name}</strong> as {character}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No cast information available</p>
        ))}
    </div>
  );
}
