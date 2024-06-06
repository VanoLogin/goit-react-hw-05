import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
export default function MoviesList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(({ title, id }) => (
        <li key={id} className={styles.movie}>
          <Link to={`/movies/${id}`} state={location}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
