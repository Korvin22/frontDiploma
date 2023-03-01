import React, { useCallback } from "react";

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    if (name === "name") {
      const nameValid = value.match(/^[а-яА-ЯёЁa-zA-Z0-9\-\s]+$/i);
      setErrors({ ...errors, [name]: nameValid ? "" : " Заполните поле имя" });
    }
    if (name === "email") {
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      setErrors({ ...errors, [name]: emailValid ? "" : " Невалидный email" });
    }
    if (name === "password") {
      const passwordValid = value.length >= 1;
      setErrors({
        ...errors,
        [name]: passwordValid ? "" : " Заполните поле пароль",
      });
    }
    if (name === "movie") {
      const movieValid = value.length >= 1;
      setErrors({
        ...errors,
        [name]: movieValid ? "" : " Заполните поле поиска",
      });
    }
    setIsValid(target.closest("form").checkValidity());

  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm, setErrors };
}
