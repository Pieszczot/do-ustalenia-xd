import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">🐾 VetKlinika</div>
          <p className="footer-desc">
            Profesjonalna opieka weterynaryjna w Poznaniu.
            Twój pupil jest u nas w dobrych łapach.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Kontakt</h4>
          <ul className="footer-list">
            <li>📍 ul. Przykładowa 12, Poznań</li>
            <li>📞 +48 61 123 456</li>
            <li>✉️ kontakt@vetklinika.pl</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Godziny otwarcia</h4>
          <ul className="footer-list">
            <li>Pon–Pt: 8:00 – 18:00</li>
            <li>Sobota: 9:00 – 14:00</li>
            <li>Niedziela: nieczynne</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Nawigacja</h4>
          <ul className="footer-list">
            <li><a href="/">Strona główna</a></li>
            <li><a href="/cennik">Cennik</a></li>
            <li><a href="/rezerwacja">Rezerwacja</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 VetKlinika. Wszelkie prawa zastrzeżone.</span>
        <span>Projekt na studia · React + Vite</span>
      </div>
    </footer>
  );
}
