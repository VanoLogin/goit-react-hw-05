import { useEffect, useState } from "react";
import { getDaysMovies } from "../../interfaces/interfacesHttp.js";
import MoviesList from "../../components/MovieList/MovieList.jsx";
export default function HomePage() {
  const [moviesList, setmoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDaysMovies()
      .then((data) => {
        setmoviesList(data.results);
        console.log(moviesList);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {moviesList.length > 0 && <MoviesList movies={moviesList} />}
    </div>
  );
}
