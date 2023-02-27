import { moviesApi } from "../../utils/MoviesApi";
import { useState } from "react";
import { useFormWithValidation } from "../../hooks/UseForm";

function SavedSearchForm(props) {
  const { values, handleChange, errors } = useFormWithValidation();
  console.log(props.shortSavedMovie);
  function handleSubmit(e) {
    e.preventDefault();
    props.setSavedSearchFinished(true);
    props.searchSavedMovie(values.movie);
  }
  console.log(props.shortMovie)
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
          checked={`${props.shortSavedMovie ? "checked" : ""}`}
          onClick={props.handleShortSavedMovieCheckbox}
        />
        <p className="search__label">Короткометражки</p>
      </div>
      <span className="search__error">{errors.movie}</span>
    </form>
  );
}

export default SavedSearchForm;
