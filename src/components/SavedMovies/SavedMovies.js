import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMoviesCardList from "../MoviesCardList/SavedMoviesCardList";

function SavedMovies(props) {

  return (
    <main>
      <Header />
      <SearchForm
        searchMovie={props.searchMovie}
        shortMovie={props.shortMovie}
        handleShortMovieCheckbox={props.handleShortMovieCheckbox}
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
