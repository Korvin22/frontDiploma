import photo from "../../images/myself.png";

function AboutMe(props) {
  return (
    <>
      <div className="myself">
        <p className="myself__section-title">Студент</p>
        <div className="myself__cv">
          <div className="myself__text">
            <h2 className="myself__title">Дмитрий</h2>
            <p className="myself__subtitle">Фронтенд-разработчик, 32 года</p>
            <p className="myself__description">
              Я живу в Москве, закончил факультет атомной энергетики МЭИ. У меня
              есть жена и сын. Увлечения - чтение, настольный теннис, шахматы.
              Знаю 2 иностранных языка. Работаю в энергетической сфере. Начал
              заниматься программированием в 2020 (python, аналитика данных). В
              2022 начал изучать фронтенд.
            </p>
            <a href={"https://github.com/Korvin22"} className="myself__github-link">Github</a>
          </div>
          <img className="myself__img" src={photo} />
        </div>
      </div>
    </>
  );
}

export default AboutMe;
