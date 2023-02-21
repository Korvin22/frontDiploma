import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useState} from "react";
function Movies(props) {

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
      />
      <MoviesCardList
        initialMovies={props.initialMovies}
        searchFinished={props.searchFinished}
        notFound={props.NotFound}
        handleMovieLikeToggle = {props.handleMovieLikeToggle}
        amount={props.amount}
        initialAmount={props.initialAmount}
      />
      <div className="movies__more">
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
