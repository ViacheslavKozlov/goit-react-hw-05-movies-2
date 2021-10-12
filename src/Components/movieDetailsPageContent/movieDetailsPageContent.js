import { lazy } from "react";
import { Route, NavLink, useHistory, useLocation, useRouteMatch, useParams } from "react-router-dom";
import { getId } from "../../services/Services";
import noPosts from "../../images/noPosts.jpg";
import style from "./MovieDetailsPageContent.module.css";

const Cast = lazy(() => import("../movieCast/MovieCast")); /* webpackChunkName: "Cast"  */
const Reviews = lazy(() => import("../movieReviews/MovieReviews")); /* webpackChunkName: "Reviews"  */

const MovieDetailsPageContent = ({ movie }) => {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { slug } = useParams();

  const movieId = getId(slug);

  const goBack = () => {
    history.push(location?.state?.from?.location ?? "/movies");
  };

  return (
    <section>
      <button className={style.btn} type="button" onClick={goBack}>
        {location?.state?.from?.label ?? "Go back"}
      </button>
      <div className={style.movieWrapper}>
        <img
          className={style.img}
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : `${noPosts}`}
          alt={movie.title}
        />
        <div className={style.infoWrapper}>
          <h2>{movie.title}</h2>
          <p>Rate {movie.vote_average}</p>
          <h3>Overview</h3>
          <p>{movie.overview ? movie.overview : "Overviews will be avaliable soon"}</p>
          <h3>Additional info</h3>
          <ul className={style.linkList}>
            <li className={style.linkListItem}>
              <NavLink
                className={style.link}
                activeClassName={style.activeLink}
                to={{
                  pathname: `${url}/cast`,
                  state: location.state
                }}
              >
                Cast
              </NavLink>
            </li>
            <li className={style.linkListItem}>
              <NavLink
                className={style.link}
                activeClassName={style.activeLink}
                to={{
                  pathname: `${url}/reviews`,
                  state: location.state
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Route path={`${url}/cast`}>
        <Cast movieId={movieId} />
      </Route>
      <Route path={`${url}/reviews`}>
        <Reviews movieId={movieId} />
      </Route>
    </section>
  );
};

export default MovieDetailsPageContent;
