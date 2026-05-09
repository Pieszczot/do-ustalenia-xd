import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPrices } from '../services/pricesService';
import './ServicesGrid.css';

export default function ServicesGrid() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPrices()
      .then((data) => setServices(data))
      .catch(() => setError('Nie udało się załadować usług.'))
      .finally(() => setLoading(false));
  }, []);

  const handleServiceClick = (serviceId) => {
    navigate(`/rezerwacja?service=${serviceId}`);
  };

  return (
    <section className="services-section" id="cennik">
      <p className="section-tag">Nasze usługi</p>
      <h2 className="section-title">Cennik usług</h2>
      <p className="section-sub">
        Transparentne ceny i kompleksowa opieka weterynaryjna dla psów, kotów i małych ssaków.
        Kliknij w usługę aby zarezerwować wizytę.
      </p>

      {loading && <p className="services-status">Ładowanie usług…</p>}
      {error && <p className="services-status services-status--error">{error}</p>}

      {!loading && !error && (
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => handleServiceClick(service.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleServiceClick(service.id)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-name">{service.name}</h3>
              <p className="service-desc">{service.description}</p>
              <div className="service-footer">
                <div className="service-price">
                  {service.price} zł <span>/ {service.unit}</span>
                </div>
                <span className="service-book-btn">Zarezerwuj →</span>
              </div>
              {service.popular && (
                <span className="service-tag">Najpopularniejsze</span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
