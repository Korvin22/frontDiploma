import Link from "react-router-dom";

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__links">
        <p className="footer__year">©️ 2022</p>
        <a href={"https://practicum.yandex.ru"} className="footer__link">
          Яндекс Практикум
        </a>
        <a href={"https://github.com/Korvin22"} className="footer__link">
          Github
        </a>
      </div>
    </footer>
  );
}

export default Footer;
