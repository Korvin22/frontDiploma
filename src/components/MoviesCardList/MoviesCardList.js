import MovieCard from "../MoviesCard/MoviesCard";





function MoviesCardList(props) {

  return (
    <div className="cards">
      {props.searchFinished ? (
        props.initialMovies.slice(0, props.amount).map((movie) => {
          return (
            <MovieCard
              nameRU={movie.nameRU}
              duration={movie.duration}
              src={`https://api.nomoreparties.co/${movie.image.url}`}
              image={`https://api.nomoreparties.co/${movie.image.url}`}
              handleMovieLikeToggle={props.handleMovieLikeToggle}
              deleteMovie={props.deleteMovie}
              country={movie.country}
              director={movie.director}
              year={movie.year}
              description={movie.description}
              trailerLink={movie.trailerLink}
              thumbnail={`https://api.nomoreparties.co/${movie.image.url}`}
              nameEN={movie.nameEN}
              movieId={movie.id}
              isLiked={movie.isLiked}
              id={movie._id}
              key={movie.id}
            />
          );
        })
      ) : (
        <p></p>
      )}
      
      <p className={`${props.isVisible ? '' : 'cards_hidden'}`}>{props.initialMovies.length === 0 ? "Ничего не найдено" : ""}</p>
    </div>
  );
}

export default MoviesCardList;
