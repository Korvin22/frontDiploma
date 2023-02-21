import { Link } from "react-router-dom";
import profile from "../../images/profile.svg";

export default function Navigation(props) {
  return (
    <>
      <div className="header__wrapper">
        <Link to="/movies" className="header__link">
          Фильмы
        </Link>
        <Link to="/saved-movies" className="header__link">
          Сохраненные фильмы
        </Link>
      </div>
      <Link to="/profile">
        <img src={profile} />
      </Link>
    </>
  );
}
