import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getMovies } from "../../interfaces/interfacesHttp";
import MoviesList from "../../components/MovieList/MovieList.jsx";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const ownerInput = searchParams.get("owner") ?? "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const inputValue = form.elements.name.value;
    searchParams.set("owner", inputValue);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (ownerInput) {
      async function handleSearch() {
        setLoading(true);
        setError(false);
        try {
          const data = await getMovies(ownerInput);
          setMovies(data.results);
        } catch (error) {
          setError(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      handleSearch();
    }
  }, [ownerInput]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Filter for a movie</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className={styles.input}
          defaultValue={ownerInput}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <div className={styles.containerList}>
        {loading && <p>Loading...</p>}
        {error && <p>Something went wrong...</p>}
        {!loading && !error && <MoviesList movies={movies} />}
      </div>
    </div>
  );
}
