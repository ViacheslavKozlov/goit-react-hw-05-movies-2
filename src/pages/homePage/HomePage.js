import React, { useState, useEffect } from "react";
import { getTrendingMovies } from "../../API/apiService";
import HomePageContent from "../../Components/homePageContent/HomePageContent";
import style from "./HomePage.module.css";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const get = async () => {
      try {
        const { results } = await getTrendingMovies();
        setMovies(results);
      } catch (err) {
        return alert(`this is the end`);
      }
    };
    get();
  }, []);

  return (
    <section>
      <h3 className={style.headline}>Trends</h3>
      {movies && <HomePageContent movies={movies} />}
      {/* <ul className={style.list}>
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
      </ul> */}
    </section>
  );
};

export default Home;
