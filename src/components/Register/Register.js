import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/UseForm";
import { useEffect, useState } from "react";
import { apiAuth } from "../../utils/Api.auth";
import { useNavigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
function Register(props) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const [isRender, setIsRender] = useState(false);
  function linkRender() {
    setIsRender(true);
  }

  useEffect(() => {
    linkRender();
  }, [isRender]);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleUpdateRegistration({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="register">
      <Link to="/">
        <img src={logo} className="logo" alt="logo" />
      </Link>
      <div className="register__container">
        <h2 className="register__title">Добро пожаловать!</h2>
        <form
          className="register__form"
          name="email-and-password"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="register__label">
            Имя
          </label>
          <input
            required
            type="text"
            name="name"
            className="register__input"
            placeholder="Имя"
            minLength="2"
            maxLength="30"
            id="name"
            onChange={handleChange}
            value={values.name}
          />
          <span className="register__error">{errors.name}</span>
          <label htmlFor="email" className="register__label">
            E-mail
          </label>
          <input
            required
            type="email"
            name="email"
            className="register__input"
            placeholder="Email"
            id="email"
            value={values.email}
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
            className="register__input"
            placeholder="Пароль"
            id="password"
            value={values.password}
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
        <p className="profile__error">{props.message}</p>
        <Preloader isLoading={props.isLoading}/>
        <div className="register__wrapper">
          <p className="register__text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
