import { Link } from "react-router-dom";
import profile from "../../images/profile.svg";

export default function NavTab(props) {
  return (
    <div className="navtab">
      <button className="button__close" onClick={props.onClose}/>
      <div className="header__wrapper">
      <Link to="/" className="header__link_burger">
          Главная
        </Link>
        <Link to="/movies" className="header__link_burger">
          Фильмы
        </Link>
        <Link to="/saved-movies" className="header__link_burger">
          Сохраненные фильмы
        </Link>
      </div>
      <Link to="/profile" className="header__account">
        <img src={profile} />
      </Link>
    </div>
  );
}
