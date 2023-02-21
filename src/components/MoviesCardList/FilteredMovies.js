import MovieCard from "../MoviesCard/MoviesCard";
import {useState} from "react";
function FilteredMovies(props) {

const [isTrue, setIsTrue] = useState(false);

  return (
    <>
      {
      isTrue ? (props.initialMovies.map((movie) => {
        return (
          <MovieCard
            name={movie.nameRU}
            duration={`${movie.duration} м`}
            src={`https://api.nomoreparties.co/${movie.image.url}`}
          />
        );
      })) : ''
      
      }
    </>
  );
}

export default FilteredMovies;