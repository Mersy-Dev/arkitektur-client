function AboutPillars({ pillars, values }) {
  return (
    <section className="about-pillars">
      <div className="about-pillars__container">
        <div className="about-pillars__grid">
          {pillars.map((pillar) => (
            <article className="about-pillars__card" key={pillar.title}>
              <div className="about-pillars__icon"><i className={`fas ${pillar.icon}`} aria-hidden="true" /></div>
              <h3>{pillar.title}</h3>
              {pillar.sentences.map((sentence) => <p key={sentence}>{sentence}</p>)}
            </article>
          ))}
        </div>
        <ul className="about-pillars__values" aria-label="Our values">
          {values.map((value) => (
            <li key={value}><i className="fas fa-check" aria-hidden="true" />{value}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AboutPillars;
