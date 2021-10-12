import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getMovieDetails } from "../../API/apiService";
import MovieDetailsPageContent from "../../Components/movieDetailsPageContent/MovieDetailsPageContent";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const { slug } = useParams();

  const getId = line => line.match(/[a-z0-9]+$/)[0];
  const movieId = getId(slug);

  useEffect(
    () => {
      const get = async () => {
        try {
          const currentMovie = await getMovieDetails(movieId);
          setMovie(currentMovie);
        } catch (err) {
          history.push(location?.state?.from?.location ?? "/movies");
          return alert(`this is the end`);
        }
      };
      get();
    },
    [history, location?.state?.from?.location, movieId]
  );

  return <>{movie && <MovieDetailsPageContent movie={movie} />}</>;
};

export default MovieDetailsPage;
