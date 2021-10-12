import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { getSearchMovies } from "../../API/apiService";
import MoviesPageContent from "../../Components/moviesPageContent/MoviesPageContent";
import style from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const history = useHistory();

  useEffect(
    () => {
      const searchLine = new URLSearchParams(location.search).get("query");
      if (!searchLine) return;
      const get = async () => {
        try {
          const { results } = await getSearchMovies(searchLine, page);
          setSearchMovie("");
          setFoundedMovies(prevFoundedMovies => [...prevFoundedMovies, ...results]);

          if (searchLine.trim() === "" && foundedMovies.length === 0) {
            return alert(`there r no movies under typed request`);
          }

          if (page > 1)
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth"
            });
        } catch (err) {
          return alert(`this is the end`);
        }
      };
      get();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search, page]
  );

  const handleSubmit = async evt => {
    evt.preventDefault();
    const normilizedInput = searchMovie.trim();
    if (!normilizedInput) return;
    try {
      const { results } = await getSearchMovies(normilizedInput);
      setFoundedMovies([]);
      setSearchMovie("");

      if (results.length === 0) {
        return alert("there r no movies under request");
      }
      history.push({ ...location, search: `query=${searchMovie}` });
    } catch (err) {
      return console.log(alert("this is the end"));
    }
  };

  const handleInputChange = evt => {
    setSearchMovie(evt.target.value);
  };

  const handleLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showButton = foundedMovies.length >= 20;

  return (
    <section>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          value={searchMovie}
          placeholder={"Type 2 find"}
          onChange={handleInputChange}
        />
        <button className={style.btn} type="submit">
          Search
        </button>
      </form>
      {foundedMovies && <MoviesPageContent foundedMovies={foundedMovies} />}
      {showButton && (
        <button className={style.loadMoreBtn} onClick={handleLoadMoreBtn}>
          More movies
        </button>
      )}
    </section>
  );
};

MoviesPage.propTypes = {
  foundedMovies: PropTypes.arrayOf(PropTypes.object),
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleLoadMoreBtn: PropTypes.func
};

export default MoviesPage;
