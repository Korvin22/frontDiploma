import Header from "../Header/Header";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import promo_fig from "../../images/figure_mainpage.svg";
import Navigation from "../Navigation/Navigation";

function Promo(props) {

  return (
    <>
      <header className="promo__header">
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>
        <div className={`${!props.loggedIn ? "promo__header_loggedin" : "promo__header_loggedout"}`}>
          <Link to="/signup" className="promo__link">
            Регистрация
          </Link>
          <Link to="/signin">
            <button className="promo__button">Войти</button>
          </Link>
        </div>
        <div className={`${props.loggedIn ? "promo__header_loggedin" : "promo__header_loggedout"}`}>
          <Navigation />
        </div>
      </header>
      <div className="promo__banner">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img src={promo_fig} className="promo__img" alt="Banner picture" />
      </div>
    </>
  );
}

export default Promo;
