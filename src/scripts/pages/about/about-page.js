import "../../../styles/about-page.css";

export default class AboutPage {
  async render() {
    return `
      <section class="about-container">
        <div class="about-header">
          <h1 class="about-title">Me at Coding Camp</h1>
          <p class="about-subtitle">My moments, life at coding camp 2025 powered by DBS Foundation</p>
        </div>

        <div class="about-section mission-section">
          <div class="section-content fade-in">
            <h2>About Me</h2>
            <p>I graduated from a vocational high school majoring in electrical power installation engineering. I am a fast learner with new things, I am also tenacious in the things that I pursue or work on.</p>
            <p>I have some experience working in contractors as a quality control and field supervisor, I also have work experience as an admin for approximately 3 years, and now I am studying to become a software engineer.</p>
          </div>
          <div class="section-image slide-in-right">
            <div class="image-container">
              <img src="/images/me.jpeg" alt="People sharing stories" class="about-image">
            </div>
          </div>
        </div>

        <div class="about-section features-section">
          <div class="section-image slide-in-left">
            <div class="video-container">
              <video src="/images/mine2.mp4" class="about-video" autoplay loop></video>
            </div>
          </div>
          <div class="section-content fade-in">
            <h2>What I Learned</h2>
            <ul class="features-list">
              <li class="feature-item">
                <span class="feature-icon"><img src="https://cdn-icons-png.flaticon.com/512/9094/9094993.png" alt="fe" style="width: 40px;"></span>
                <div class="feature-text">
                  <h3>Frontend</h3>
                  <p>Focuses on creating the user interface (UI) of a website or application that users directly interact with.</p>
                </div>
              </li>
              <li class="feature-item">
                <span class="feature-icon"><img src="https://cdn-icons-png.flaticon.com/512/6213/6213731.png" alt="be" style="width: 45px;"></span>
                <div class="feature-text">
                  <h3>Backend</h3>
                  <p>The server-side components and infrastructure that handle data processing, storage, and logic behind a web application or software.</p>
                </div>
              </li>
              <li class="feature-item">
                <span class="feature-icon"><img src="https://cdn-icons-png.flaticon.com/256/6171/6171939.png" alt="soft-skill" style="width: 50px;"></span>
                <div class="feature-text">
                  <h3>Soft Skill</h3>
                  <p>Personal attributes and interpersonal abilities that describe how someone works and interacts with others.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="about-section team-section">
          <h2 class="team-title fade-in">Meet My Capstone Team</h2>
          <div class="team-grid">
            <div class="team-member fade-in">
              <div class="member-photo">
                <img src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png" alt="Team member" class="member-image">
              </div>
              <h3>Yuda Reyvandra Herman</h3>
              <p>Team Leader (MC)</p>
            </div>
            <div class="team-member fade-in">
              <div class="member-photo">
                <img src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png" alt="Team member" class="member-image">
              </div>
              <h3>Damianus Christopher S</h3>
              <p>Member (MC)</p>
            </div>
            <div class="team-member fade-in">
              <div class="member-photo">
                <img src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png" alt="Team member" class="member-image">
              </div>
              <h3>Reksi Hendra Pratama</h3>
              <p>Member (MC)</p>
            </div>
            <div class="team-member fade-in">
              <div class="member-photo">
                <img src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png" alt="Team member" class="member-image">
              </div>
              <h3>Muhammad Wildan Nur</h3>
              <p>Member (FEBE)</p>
            </div>
            <div class="team-member fade-in">
              <div class="member-photo">
                <img src="https://media-cgk1-2.cdn.whatsapp.net/v/t61.24694-24/483643490_1319836789318407_2555980662427249054_n.jpg?ccb=11-4&oh=01_Q5Aa1QEE1NBwN3QaExY_ykoZV1_ozhIm1DsKyhKtJ4yFmbxiyQ&oe=68222CEB&_nc_sid=5e03e0&_nc_cat=104" alt="Team member" class="member-image">
              </div>
              <h3>Marsella Vindriani </h3>
              <p>Member (FEBE)</p>
            </div>
            <div class="team-member fade-in">
              <div class="member-photo">
                <img src="https://cdn-icons-png.flaticon.com/512/5556/5556499.png" alt="Team member" class="member-image">
              </div>
              <h3>Miftahurrohman</h3>
              <p>Member (FEBE)</p>
            </div>
          </div>
        </div>

        <div class="about-section contact-section fade-in">
          <h2>Contact Me</h2>
          <p>Have questions or join cooperation?</p>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <p>mf.rohman0101@gmail.com</p>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📱</span>
              <p>+62 823 4082 3214</p>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <p>Jl. Manunggal No.61, Semanding Tuban, Jawa Timur 62391</p>
            </div>
          </div>
          <div class="social-links">
            <a href="https://www.tiktok.com/@_died00?_t=ZS-8w1rzCZphZ9&_r=1" class="social-link">Tiktok</a>
            <a href="https://www.instagram.com/mf.en.er?igsh=NHExOG83eGEyZHE3" class="social-link">Instagram</a>
            <a href="https://www.linkedin.com/in/‎-miftahurrohman-717a12342" class="social-link">LinkedIn</a>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          if (entry.target.classList.contains("slide-in-right")) {
            entry.target.style.transform = "translateX(0)";
          } else if (entry.target.classList.contains("slide-in-left")) {
            entry.target.style.transform = "translateX(0)";
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".fade-in, .slide-in-right, .slide-in-left")
      .forEach((el) => {
        observer.observe(el);
      });

    const featureItems = document.querySelectorAll(".feature-item");
    featureItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateX(10px)";
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "translateX(0)";
      });
    });
  }
}
