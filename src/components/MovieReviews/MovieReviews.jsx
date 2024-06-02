import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getMovieReviews } from "../../interfaces/interfacesHttp";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieReview() {
      try {
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData.results);
        console.log(reviewsData.results);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieReview();
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}

      {reviews && reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map(({ author, content, id }) => (
            <li key={id} className={styles.movie}>
              <p>
                <strong>{author}</strong>
              </p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
}
