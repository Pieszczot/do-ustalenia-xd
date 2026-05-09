import { Link } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Gabinet weterynaryjny · Poznań
        </div>

        <h1 className="hero-title">
          Twój zwierzak<br />
          zasługuje na<br />
          <em>najlepszą opiekę</em>
        </h1>

        <p className="hero-desc">
          Profesjonalne usługi weterynaryjne z troską i empatią.
          Rezerwuj wizyty online – szybko, wygodnie, bez kolejek.
        </p>

        <div className="hero-btns">
          <Link to="/rezerwacja" className="btn-primary">
            Zarezerwuj wizytę →
          </Link>
          <a href="#jak-to-dziala" className="btn-ghost">
            Jak to działa ↓
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-num">1 200+</span>
            <span className="stat-label">zadowolonych pacjentów</span>
          </div>
          <div className="hero-stat">
            <span className="stat-num">8 lat</span>
            <span className="stat-label">doświadczenia</span>
          </div>
          <div className="hero-stat">
            <span className="stat-num">4.9 ★</span>
            <span className="stat-label">ocena Google</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-cards">
          <div className="hero-card hero-card--tall hero-card--green">
            <span className="card-emoji">🐕</span>
            <div className="card-overlay">
              <span className="card-label">Badanie ogólne</span>
              <span className="card-sublabel">od 80 zł</span>
            </div>
            <div className="card-pill">Najpopularniejsze</div>
          </div>
          <div className="hero-card hero-card--yellow">
            <span className="card-emoji">🐈</span>
          </div>
          <div className="hero-card hero-card--blue">
            <span className="card-emoji">🐇</span>
          </div>
        </div>

        <div className="hero-float hero-float--top">
          <span className="float-dot float-dot--green" />
          <div>
            <div className="float-title">Najbliższy termin: dziś</div>
            <div className="float-sub">15:30 – wolne</div>
          </div>
        </div>

        <div className="hero-float hero-float--bottom">
          <span className="float-dot float-dot--blue" />
          <div>
            <div className="float-title">Rezerwacja potwierdzona</div>
            <div className="float-sub">Burek · Jutro 10:00</div>
          </div>
        </div>
      </div>
    </section>
  );
}
