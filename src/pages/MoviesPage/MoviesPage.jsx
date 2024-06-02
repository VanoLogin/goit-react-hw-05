import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getMovies } from "../../interfaces/interfacesHttp";
import MoviesList from "../../components/MovieList/MovieList.jsx";
import { useLocation, useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  // const [movie, setMovie] = useState("");
  const [shootFetch, setShootFetch] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const ownerInput = searchParams.get("owner") ?? "";
  // console.log(ownerInput);
  const location = useLocation();
  console.log(location);
  function handleClick() {
    setShootFetch(true);
  }

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    searchParams.set("owner", newValue);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (shootFetch) {
      async function handleSearch() {
        setLoading(true);
        setError(false);
        try {
          const data = await getMovies(ownerInput);
          setMovies(data.results);
          setShootFetch(false);
        } catch (error) {
          setError(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      handleSearch();
    }
  }, [shootFetch]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Filter for a movie</p>
      <input
        type="text"
        name="name"
        className={styles.input}
        value={ownerInput}
        onChange={handleInputChange}
      />
      <button className={styles.button} onClick={handleClick}>
        Search
      </button>
      <div className={styles.containerList}>
        {loading && <p>Loading...</p>}
        {error && <p>Something went wrong...</p>}
        {!loading && !error && <MoviesList movies={movies} />}
      </div>
    </div>
  );
}
