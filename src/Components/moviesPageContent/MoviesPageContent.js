import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { createSlug } from "../../services/Services";
import noPosts from "../../images/noPosts.jpg";
import style from "../../pages/moviesPage/MoviesPage.module.css";

const MoviesPageContent = ({ foundedMovies }) => {
  const location = useLocation();

  return (
    <ul className={style.list}>
      {foundedMovies.map(({ id, title, poster_path }) => (
        <li className={style.listItem} key={id}>
          <Link
            to={{
              pathname: `/movies/${createSlug(`${title} ${id}`)}`,
              state: {
                from: {
                  location,
                  lable: "back 2 movies"
                }
              }
            }}
          >
            <img
              className={style.img}
              src={poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : `${noPosts}`}
              alt={title}
            />
            <p className={style.itemTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesPageContent.propTypes = {
  foundedMovies: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number,
  title: PropTypes.string,
  poster_path: PropTypes.string
};

export default MoviesPageContent;
