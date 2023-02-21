function AboutProject(props) {
  return (
    <div className="project">
      <h2 className="project__title">О проекте</h2>
      <ul className="project__section">
        <div className="project__description">
          <h3 className="project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="project__description">
          <h3 className="project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </ul>
      <ul className="project__timescale">
        <li className="project__part">
          <fig className="project__backend">1 неделя</fig>
          <figcaption className="project__caption">Back-end</figcaption>
        </li>
        <li className="project__part">
          <fig className="project__frontend">4 недели</fig>
          <figcaption className="project__caption">Front-end</figcaption>
        </li>
      </ul>
    </div>
  );
}

export default AboutProject;
