import { useState } from "react";

function MovieCard(props) {
  const { isLiked, handleMovieLikeToggle, deleteMovie } = props;

  function toggleLike() {
    handleMovieLikeToggle(props);
  }

  function handleDelete() {
    deleteMovie(props);
  }

  function handleDuration(data) {
    if (data > 60) {
return `${Math.floor(data/60)} ч ${data%60} м`
    }
    return `${data} м`
  }

  return (
    <div className="cards__card">
      <img src={props.src} alt={props.name} className="cards__picture" />
      <div className="cards__description">
        <h2 className="cards__title">{props.nameRU}</h2>
        <button
          className={`${
            isLiked ? "cards__like_active" : "cards__like_inactive"
          } ${
            window.location.pathname === "/saved-movies"
              ? "cards__like_none"
              : ""
          }`}
          type="button"
          onClick={toggleLike}
        ></button>
        <button
          className={
            window.location.pathname === "/movies"
              ? "cards__trash_inactive"
              : "cards__trash_active"
          }
          type="button"
          onClick={handleDelete}
        ></button>
      </div>
      <p className="cards__movie-duration">{handleDuration(props.duration)}</p>
    </div>
  );
}

export default MovieCard;
