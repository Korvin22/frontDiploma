import Header from "../Header/Header";
import line from "../../images/line.svg";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/UseForm";
import { apiAuth } from "../../utils/Api.auth";
function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isRender, setIsRender] = useState(false);
  function linkRender() {
    setIsRender(true);
  }

  useEffect(() => {
    linkRender();
    
  }, [isRender]);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const [edit, setEdit] = useState(false);

  function handleEditUser() {
    setEdit(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleUpdateUser({
      name: values.name,
      email: values.email,
    });
  }



  return (
    <>
      <Header />
      <div className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}</h2>
        <form className="profile__form" name="profile" onSubmit={handleSubmit}>
          <div className="profile__inputs">
            <p className="profile__label">Имя</p>
            <input
              id="name"
              dir="rtl"
              name="name"
              className="profile__input"
              value={values.name}
              placeholder={currentUser.name}
              onChange={handleChange}
              required
            />
            <img src={line} className="profile__line" />
            <img src={line} className="profile__line" />
            <p className="profile__label">Почта</p>
            <input
              id="email"
              dir="rtl"
              name="email"
              className="profile__input"
              value={values.email}
              placeholder={currentUser.email}
              onChange={handleChange}
              required
            />
          </div>
          <span className="profile__error">{errors.name}</span>
          <span className="profile__error">{errors.email}</span>
          <button
            className={`${
              !(errors.name || errors.email || !isValid)
                ? "profile-edit__button"
                : "profile-edit__button_disabled"
            }`}
            onClick={handleEditUser}
            disabled={`${
              !(errors.name || errors.email || !isValid) ? "" : "disabled"
            }`}
          >
            Редактировать
          </button>
        </form>
        <p className="profile__error">{props.message}</p>
        <p className="profile__success">{props.successMessage}</p>
        <Link className="profile__link" to="/signin" onClick={props.signOut}>
          Выйти из аккаунта
        </Link>
      </div>
    </>
  );
}

export default Profile;
