import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import slugify from "slugify";
import { getTrendingMovies } from "../../API/apiService";
import noPosts from "../../images/noPosts.jpg";
import style from "./HomePage.module.css";

const createSlug = string =>
  slugify(string, {
    lower: true
  });

const Home = () => {
  const [movies, setMovies] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const get = async () => {
      const { results } = await getTrendingMovies();
      setMovies(results);
    };
    get();
  }, []);

  return (
    <section>
      <h3 className={style.headline}>Trends</h3>
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
    </section>
  );
};

export default Home;
