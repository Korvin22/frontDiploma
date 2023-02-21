import link from "../../images/link.svg";

function Portfolio(props) {
  return (
    <div className="portfolio">
      <p className="portfolio__description">Портфолио</p>
      <ul className="portfolio__links">
        <div className="portfolio__item">
          <a className="portfolio__link" href={"https://github.com/Korvin22"}>Статичный сайт</a>
          <img src={link} alt="Ссылка" />
        </div>
        <div className="portfolio__item">
          <a className="portfolio__link" href={"https://github.com/Korvin22"}>Адаптивный сайт</a>
          <img src={link} alt="Ссылка" />
        </div>
        <div className="portfolio__item">
          <a className="portfolio__link" href={"https://github.com/Korvin22"}>Одностраничное приложение</a>
          <img src={link} alt="Ссылка" />
        </div>
      </ul>
    </div>
  );
}

export default Portfolio;
