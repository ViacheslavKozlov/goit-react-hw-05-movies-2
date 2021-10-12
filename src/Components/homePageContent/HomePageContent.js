import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { createSlug } from "../../services/Services";
import noPosts from "../../images/noPosts.jpg";
import style from "../../pages/homePage/HomePage.module.css";

const HomePageContent = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={style.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li className={style.listItem} key={id}>
          <Link
            to={{
              pathname: `/movies/${createSlug(`${title} ${id}`)}`,
              state: {
                from: {
                  location,
                  lable: "back 2 Home"
                }
              }
            }}
          >
            <img src={poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : `${noPosts}`} alt={title} />
            <p className={style.itemTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

HomePageContent.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default HomePageContent;
