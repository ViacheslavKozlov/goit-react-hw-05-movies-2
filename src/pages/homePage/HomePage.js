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
    </section>
  );
};

export default Home;
