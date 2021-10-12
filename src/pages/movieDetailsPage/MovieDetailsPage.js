import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getMovieDetails } from "../../API/apiService";
import MovieDetailsPageContent from "../../Components/movieDetailsPageContent/MovieDetailsPageContent";
import { getId } from "../../services/Services";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const { slug } = useParams();

  const movieId = getId(slug);
  const prevLocation = location?.state?.from?.location;

  useEffect(
    () => {
      const get = async () => {
        try {
          const currentMovie = await getMovieDetails(movieId);
          setMovie(currentMovie);
        } catch (err) {
          history.push(prevLocation ?? "/movies");
          return alert(`this is the end`);
        }
      };
      get();
    },
    [history, prevLocation, movieId]
  );

  return <>{movie && <MovieDetailsPageContent movie={movie} />}</>;
};

export default MovieDetailsPage;
