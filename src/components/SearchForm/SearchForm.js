import { moviesApi } from "../../utils/MoviesApi";
import { useState } from "react";
import { useFormWithValidation } from "../../hooks/UseForm";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
function SearchForm(props) {
  const location = useLocation();
  const { values, setValues, handleChange, errors } = useFormWithValidation();
  
console.log(props.searchValue)
  function handleSubmit(e) {
    e.preventDefault();

    props.searchMovie(values.movie);
    
  }

  useEffect(() => {
    if (location.pathname === '/movies') {
      console.log(props.searchValue, 'searchValue')
      setValues({ movie: props.searchValue });
      console.log(values);
    }
  }, [location, props.searchValue]);

  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search__input"
        name="movie"
        required
        value={values.movie || ''}
        onChange={handleChange}
      />
      <button className="search__button">Поиск</button>
      <div className="search__wrapper">
        <input
          className="search__radio"
          id="radio"
          type="radio"
          name="radio"
          checked={`${props.shortMovie ? "checked" : ""}`}
          onClick={props.handleShortMovieCheckbox}
        />
        <p className="search__label">Короткометражки</p>
      </div>
      <span className="search__error">{errors.movie}</span>
    </form>
  );
}

export default SearchForm;
