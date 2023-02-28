import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMoviesCardList from "../MoviesCardList/SavedMoviesCardList";
import SavedSearchForm from "../SearchForm/SavedSearchForm";
import { useEffect } from "react";

function SavedMovies(props) {
  useEffect(() => {props.loadSavedMovies();
    props.setSavedSearchFinished(true);
  }, []);
  console.log(props.savedSearchFinished, props.savedMovies)
  const savedMovies = props.savedSearchFinished ? props.savedMovies : props.savedMoviesSearchResult;
console.log(props.savedMovies)
  return (
    <main>
      <Header />
      <SavedSearchForm
        searchMovie={props.searchMovie}
        shortMovie={props.shortMovie}
        handleShortMovieCheckbox={props.handleShortMovieCheckbox}
        searchSavedMovie = {props.searchSavedMovie}
        savedSearchFinished={props.savedSearchFinished}
        setSavedSearchFinished={props.setSavedSearchFinished}
        savedSearchValue={props.savedSearchValue}
        handleShortSavedMovieCheckbox={props.handleShortSavedMovieCheckbox}
        shortSavedMovie={props.shortSavedMovie}
      />
      <SavedMoviesCardList
        initialMovies={savedMovies}
        savedSearchFinished={props.savedSearchFinished}
        notFound={props.NotFound}
        handleMovieLikeToggle = {props.handleMovieLikeToggle}
        deleteMovie={props.deleteMovie}
      />
      <Footer />
    </main>
  );
}

export default SavedMovies;
