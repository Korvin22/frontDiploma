import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormWithValidation } from "../../hooks/UseForm";
import { useNavigate } from "react-router-dom";
import {apiAuth} from "../../utils/Api.auth";
import Preloader from "../Preloader/Preloader";

function Login(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [authUserData, setAuthUserData] = useState({});
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();


  function handleSubmit(e) {
    e.preventDefault();
    props.handleUpdateAutharization({
      email: values.email,
      password: values.password,
    });
    props.handleLogin();
    resetForm();
  }

  return (
    <div className="login">
      <Link to="/">
        <img src={logo} className="logo" alt="logo" />
      </Link>
      <div className="register__container">
        <h2 className="register__title">Рады видеть!</h2>
        <form
          className="register__form"
          name="email-and-password"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="register__label">
            E-mail
          </label>
          <input
            required
            type="email"
            name="email"
            className="register__input_login"
            placeholder="Email"
            id="email"
            value={values.email || ""}
            onChange={handleChange}
          />
          <span className="register__error">{errors.email}</span>
          <label htmlFor="password" className="register__label">
            Пароль
          </label>
          <input
            required
            type="password"
            name="password"
            className="register__input_login"
            placeholder="Пароль"
            id="password"
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className="register__error">{errors.password}</span>
          <button
            className={`${
              isValid ? "register__button" : "register__button_disabled"
            }`}
            type="submit"
            disabled={`${isValid ? "" : "disabled"}`}
          >
            Войти
          </button>
        </form>
        <Preloader isLoading={props.isLoading}/>
        <p className="profile__error">{props.message}</p>
        <div className="register__wrapper">
          <p className="register__text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="register__link">
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
