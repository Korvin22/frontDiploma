import link from "../../images/link.svg";

function Portfolio(props) {
  return (
    <div className="portfolio">
      <p className="portfolio__description">Портфолио</p>
      <ul className="portfolio__links">
        <div className="portfolio__item">
          <a className="portfolio__link" href={"https://github.com/Korvin22/how-to-learn"} target="_blank">Статичный сайт</a>
          <img src={link} alt="Ссылка" />
        </div>
        <div className="portfolio__item">
          <a className="portfolio__link" href={"https://github.com/Korvin22/russian-travel"} target="_blank">Адаптивный сайт</a>
          <img src={link} alt="Ссылка" />
        </div>
        <div className="portfolio__item">
          <a className="portfolio__link" href={"https://github.com/Korvin22/react-mesto-auth"} target="_blank">Одностраничное приложение</a>
          <img src={link} alt="Ссылка" />
        </div>
      </ul>
    </div>
  );
}

export default Portfolio;
