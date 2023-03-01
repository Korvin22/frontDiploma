import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useEffect } from "react";
import {useWindowSize} from "../../hooks/UseLayout";
function Movies(props) {
  const size = useWindowSize();

useEffect(()=> {
  handleAmount(size);
  props.setSearchFinished(true);
  props.mountSearchResult(size);

}, [])
  function handleAmount() {

    props.handleAmount(size)

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
            props.isVisible
              ? "movies__more"
              : "movies__more_hidden"
          }`}>
        <button
          className={` ${
            (props.initialMovies.length <= props.amount)
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
