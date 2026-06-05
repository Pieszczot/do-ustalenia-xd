import './HowItWorks.css';

const STEPS = [
  {
    num: '1',
    title: 'Utwórz konto',
    desc: 'Zarejestruj się podając adres e-mail i hasło. Zajmie Ci to mniej niż minutę.',
  },
  {
    num: '2',
    title: 'Wybierz usługę',
    desc: 'Przejrzyj dostępne usługi i wybierz tę, która odpowiada potrzebom Twojego pupila.',
  },
  {
    num: '3',
    title: 'Wybierz termin',
    desc: 'Sprawdź dostępne godziny i wybierz najbardziej odpowiadający Ci termin.',
  },
  {
    num: '4',
    title: 'Gotowe!',
    desc: 'Otrzymasz potwierdzenie rezerwacji. Do zobaczenia w gabinecie!',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section" id="jak-to-dziala">
      <p className="section-tag">Jak to działa</p>
      <h2 className="section-title">Rezerwacja w 4 prostych krokach</h2>
      <p className="section-sub">
        Zarejestruj się raz i zarządzaj wizytami swojego pupila online – szybko i bez stresu.
      </p>

      <div className="steps-grid">
        {STEPS.map((step) => (
          <div key={step.num} className="step-card">
            <div className="step-num">{step.num}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
