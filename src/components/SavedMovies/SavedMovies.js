import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMoviesCardList from "../MoviesCardList/SavedMoviesCardList";
import SavedSearchForm from "../SearchForm/SavedSearchForm";

function SavedMovies(props) {

  return (
    <main>
      <Header />
      <SavedSearchForm
        searchMovie={props.searchMovie}
        shortMovie={props.shortMovie}
        handleShortMovieCheckbox={props.handleShortMovieCheckbox}
        searchSavedMovie = {props.searchSavedMovie}
      />
      <SavedMoviesCardList
        initialMovies={props.savedMovies}
        searchFinished={props.searchFinished}
        notFound={props.NotFound}
        handleMovieLikeToggle = {props.handleMovieLikeToggle}
        deleteMovie={props.deleteMovie}
      />
      <Footer />
    </main>
  );
}

export default SavedMovies;
