import success_registration from "../../images/success_registration.svg";
import failed_registration from "../../images/failed_registration.svg";

function InfoToolTip(props) {

  return (
    <section
      className={`popup popup-delete ${
        props.isOpen ? "popup_opened" : "popup_closed"
      }`}
    >
      <div className="popup__container-delete">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__container-delete">
          <img
            src={props.successReg ? success_registration : failed_registration}
            alt={
              props.successReg
                ? "Знак успешной регистрации"
                : "Знак ошибочной регистрации"
            }
          />
          <h2 className="popup__title popup__title_confirm">
            {props.successReg
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте еще раз."}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default InfoToolTip;
