import { moviesApi } from "../../utils/MoviesApi";
import { useState } from "react";
import { useFormWithValidation } from "../../hooks/UseForm";

function SearchForm(props) {
  const { values, handleChange, errors } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    props.searchMovie(values.movie);
  }
  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search__input"
        placeholder="Фильм"
        name="movie"
        required
        value={values.movie || ""}
        onChange={handleChange}
      />
      <button className="search__button">Поиск</button>
      <div className="search__wrapper">
        <input
          className="search__radio"
          id="radio"
          type="radio"
          name="radio"
          defaultChecked={`${!!props.shortMovie ? "checked" : ""}`}
          onClick={props.handleShortMovieCheckbox}
        />
        <p className="search__label">Короткометражки</p>
      </div>
      <span className="search__error">{errors.movie}</span>
    </form>
  );
}

export default SearchForm;
