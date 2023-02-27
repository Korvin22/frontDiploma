import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
console.log(props.searchValue, 'movie')
  function handleAmount() {

    props.handleAmount()

  }

  return (
    <main>
      <Header />
      <SearchForm
        searchMovie={props.searchMovie}
        shortMovie={props.shortMovie}
        handleShortMovieCheckbox={props.handleShortMovieCheckbox}
        searchValue={props.searchValue}
      />
      <MoviesCardList
        initialMovies={props.initialMovies}
        searchFinished={props.searchFinished}
        notFound={props.NotFound}
        handleMovieLikeToggle = {props.handleMovieLikeToggle}
        amount={props.amount}
        initialAmount={props.initialAmount}
        isVisible={props.isVisible}
      />
      <Preloader isLoading={props.isLoading}/>
      <div className={` ${
            props.searchFinished
              ? "movies__more"
              : "movies__more_hidden"
          }`}>
        <button
          className={` ${
            props.stopMore
              ? "movies__button_hidden"
              : "movies__button"
          }`}
          onClick={handleAmount}
        >
          Ещё
        </button>
      </div>
      <Footer />
    </main>
  );
}

export default Movies;
