export default class AboutView {
  render({ personalInfo, skills, team, contact }) {
    return `
      
        <section class="about-container" id="about-page" tabindex="1">
          <div class="about-header">
            <h1 class="about-title">${personalInfo.title}</h1>
            <p class="about-subtitle">${personalInfo.subtitle}</p>
          </div>
  
          <div class="about-section mission-section">
            <div class="section-content fade-in">
              <h2 >About Me</h2>
              <p id="about-me">${personalInfo.description}</p>
            </div>
            <div class="section-image slide-in-right">
                <div class="image-container">
                    <img src="/images/me.jpeg" alt="Profile" class="about-image">
                </div>
            </div>
          </div>
  
          <div class="about-section features-section">
            <div class="section-image slide-in-left">
                <div class="video-container">
                    <video src="/images/mine1.gif" class="about-video" autoplay loop></video>
                </div>
            </div>
            <div class="section-content fade-in">
              <h2>What I Learned</h2>
              <ul class="features-list">
                ${skills
                  .map(
                    (skill) => `
                  <li class="feature-item">
                    <span class="feature-icon"><img src="${skill.icon}" alt="${skill.title}" style="width: 40px;"></span>
                    <div class="feature-text">
                      <h3>${skill.title}</h3>
                      <p>${skill.description}</p>
                    </div>
                  </li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
  
          <div class="about-section team-section">
            <h2 class="team-title fade-in">Meet My Capstone Team</h2>
            <div class="team-grid">
              ${team
                .map(
                  (member) => `
                <div class="team-member fade-in">
                  <div class="member-photo">
                    <img src="${member.image}" alt="${member.name}" class="member-image">
                  </div>
                  <h3>${member.name}</h3>
                  <p>${member.role}</p>
                </div>`
                )
                .join("")}
            </div>
          </div>
  
          <div class="about-section contact-section fade-in">
            <h2>Contact Me</h2>
            <p>Have questions or join cooperation?</p>
            <div class="contact-info">
              <div class="contact-item"><span class="contact-icon">📧</span><p>${
                contact.email
              }</p></div>
              <div class="contact-item"><span class="contact-icon">📱</span><p>${
                contact.phone
              }</p></div>
              <div class="contact-item"><span class="contact-icon">📍</span><p>${
                contact.address
              }</p></div>
            </div>
            <div class="social-links">
                ${contact.socials
                  .map(
                    (social) => `
                  <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer">${social.name}</a>
                `
                  )
                  .join("")}
              </div>
          </div>
        </section>
      `;
  }
}
