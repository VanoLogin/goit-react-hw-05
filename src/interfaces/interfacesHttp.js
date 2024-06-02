import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmExMWVkMmQ2NzQyYzZkZWFiZDdmNzdhY2MwMmQ3MiIsInN1YiI6IjY2NWEwNjNlMTM1MDVkY2VjYzUwOThjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQYyhGIgerrzfZSkQ67jpln-g2_dcFcui7kG01zmqu8",
  },
};

async function getDaysMovies() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error Http", error);
  }
}
async function getMovieById(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie by ID", error);
  }
}
async function getMovieReviews(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`,
      options
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movie by ID", error);
  }
}
async function getMovieCast(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movie by ID", error);
  }
}
async function getMovies(value) {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query: value,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9...",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmExMWVkMmQ2NzQyYzZkZWFiZDdmNzdhY2MwMmQ3MiIsInN1YiI6IjY2NWEwNjNlMTM1MDVkY2VjYzUwOThjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQYyhGIgerrzfZSkQ67jpln-g2_dcFcui7kG01zmqu8",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movies", error);
    throw error;
  }
}

export {
  getDaysMovies,
  getMovieById,
  getMovieReviews,
  getMovieCast,
  getMovies,
};
