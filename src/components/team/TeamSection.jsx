const socialNetworks = [
  { key: "facebook", icon: "fa-facebook-f", label: "Facebook" },
  { key: "twitter", icon: "fa-twitter", label: "Twitter" },
  { key: "linkedin", icon: "fa-linkedin-in", label: "LinkedIn" },
  { key: "instagram", icon: "fa-instagram", label: "Instagram" },
];

function TeamSection({
  members,
  label = "OUR TEAM",
  heading = "Meet The People Behind Every Design",
  intro = "A multidisciplinary team united by thoughtful architecture and close collaboration.",
}) {
  return (
    <section className="team-section">
      <div className="team-section__container">
        <div className="team-section__heading">
          <h2 className="team-section__label"><span>{label}</span></h2>
          <h3>{heading}</h3>
          {intro && <p>{intro}</p>}
        </div>
        <div className="team-section__grid">
          {members.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="team-card__photo">
                <img src={member.photo} alt={`${member.name}, ${member.role}`} />
                <div className="team-card__overlay" aria-hidden="true" />
                <div className="team-card__social">
                  {socialNetworks.map((network) => {
                    const href = member.social?.[network.key];
                    return href ? (
                      <a
                        href={href}
                        key={network.key}
                        aria-label={`${member.name} on ${network.label}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={`fab ${network.icon}`} aria-hidden="true" />
                      </a>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="team-card__body">
                <h4>{member.name}</h4>
                <div className="team-card__role">{member.role}</div>
                <p>{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
