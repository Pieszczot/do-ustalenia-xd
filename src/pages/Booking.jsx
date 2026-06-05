import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPrices } from '../services/pricesService';
import { getAvailableSlots, createBooking } from '../services/bookingService';
import './Booking.css';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const serviceId = Number(searchParams.get('service'));

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');

  const [form, setForm] = useState({ name: '', phone: '', email: '', petName: '', petType: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    getPrices().then((data) => {
      setServices(data);
      if (serviceId) {
        const found = data.find((s) => s.id === serviceId);
        if (found) setSelectedService(found);
      }
    });
  }, [serviceId]);

  // Pobierz sloty gdy zmienia się data
  useEffect(() => {
    if (!selectedDate) return;
    setSlots([]);
    setSelectedSlot('');
    setSlotsLoading(true);
    getAvailableSlots(selectedDate)
      .then(setSlots)
      .finally(() => setSlotsLoading(false));
  }, [selectedDate]);

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedSlot) return;
    setSubmitting(true);
    try {
      const result = await createBooking({
        serviceId: selectedService.id,
        date: selectedDate,
        time: selectedSlot,
        ...form,
      });
      setBookingId(result.id);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const freeSlots = slots.filter((s) => s.available);

  // Ekran potwierdzenai
  if (submitted) {
    return (
      <div className="booking-page">
        <div className="booking-success">
          <div className="booking-success-icon">✓</div>
          <h1 className="booking-title">Rezerwacja przyjęta!</h1>
          <p className="booking-sub">Skontaktujemy się z Tobą w celu potwierdzenia wizyty.</p>
          <div className="booking-success-summary">
            <div className="bss-row"><span>Usługa</span><strong>{selectedService.name}</strong></div>
            <div className="bss-row"><span>Data</span><strong>{selectedDate}</strong></div>
            <div className="bss-row"><span>Godzina</span><strong>{selectedSlot}</strong></div>
            <div className="bss-row"><span>Zwierzę</span><strong>{form.petName}</strong></div>
            <div className="bss-row"><span>Nr rezerwacji</span><strong>#{bookingId}</strong></div>
          </div>
          <a href="/" className="auth-btn" style={{ textAlign: 'center', display: 'block', textDecoration: 'none', marginTop: '1.5rem' }}>
            Wróć na stronę główną
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <p className="section-tag">Gabinet VetKlinika</p>
        <h1 className="booking-title">Rezerwacja wizyty</h1>
        <p className="booking-sub">Wybierz usługę, termin i wypełnij dane.</p>
      </div>

      <div className="booking-layout">
        {/* Lewa kolumna – uslugi */}
        <div className="booking-services">
          <h2 className="booking-section-title">Wybierz usługę</h2>
          <div className="booking-services-list">
            {services.map((service) => (
              <div
                key={service.id}
                className={`booking-service-item ${selectedService?.id === service.id ? 'active' : ''}`}
                onClick={() => setSelectedService(service)}
              >
                <span className="bsi-icon">{service.icon}</span>
                <div className="bsi-info">
                  <span className="bsi-name">{service.name}</span>
                  <span className="bsi-price">{service.price} zł</span>
                </div>
                {selectedService?.id === service.id && <span className="bsi-check">✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Prawa kolumna – data, sloty, formularz */}
        <div className="booking-form-wrap">

          {/* Wybrana usluga – podsumwoanie */}
          {selectedService && (
            <div className="booking-selected-service">
              <span>{selectedService.icon}</span>
              <div>
                <div className="bss-name">{selectedService.name}</div>
                <div className="bss-price">{selectedService.price} zł / {selectedService.unit}</div>
              </div>
            </div>
          )}

          {/* Wybor daty */}
          <h2 className="booking-section-title" style={{ marginTop: '1.5rem' }}>Wybierz datę</h2>
          <input
            type="date"
            className="booking-date-input"
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          {/* Sloty godzinowe */}
          {selectedDate && (
            <div className="booking-slots-wrap">
              <h2 className="booking-section-title">Dostępne godziny</h2>

              {slotsLoading && (
                <p className="slots-info">Sprawdzam dostępność…</p>
              )}

              {!slotsLoading && slots.length === 0 && (
                <p className="slots-info slots-info--empty">
                  Brak dostępnych terminów w tym dniu. Wybierz inną datę.
                </p>
              )}

              {!slotsLoading && slots.length > 0 && freeSlots.length === 0 && (
                <p className="slots-info slots-info--empty">
                  Wszystkie terminy w tym dniu są zajęte.
                </p>
              )}

              {!slotsLoading && slots.length > 0 && (
                <div className="slots-grid">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      className={`slot-btn ${!slot.available ? 'slot-btn--taken' : ''} ${selectedSlot === slot.time ? 'slot-btn--selected' : ''}`}
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.time)}
                    >
                      {slot.time}
                      {!slot.available && <span className="slot-taken-label">zajęty</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Formularz danych */}
          {selectedSlot && (
            <>
              <h2 className="booking-section-title" style={{ marginTop: '1.5rem' }}>Twoje dane</h2>
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Imię i nazwisko</label>
                    <input type="text" name="name" placeholder="Jan Kowalski" value={form.name} onChange={handleFormChange} required />
                  </div>
                  <div className="form-group">
                    <label>Telefon</label>
                    <input type="tel" name="phone" placeholder="+48 600 000 000" value={form.phone} onChange={handleFormChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Adres e-mail</label>
                  <input type="email" name="email" placeholder="jan@example.com" value={form.email} onChange={handleFormChange} required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Imię zwierzęcia</label>
                    <input type="text" name="petName" placeholder="Burek" value={form.petName} onChange={handleFormChange} required />
                  </div>
                  <div className="form-group">
                    <label>Gatunek</label>
                    <select name="petType" value={form.petType} onChange={handleFormChange}>
                      <option value="">Wybierz...</option>
                      <option value="dog">Pies</option>
                      <option value="cat">Kot</option>
                      <option value="rabbit">Królik</option>
                      <option value="other">Inny</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Opis problemu (opcjonalnie)</label>
                  <textarea name="notes" placeholder="Opisz krótko z czym przychodzisz..." rows={3} value={form.notes} onChange={handleFormChange} />
                </div>

                {/* Podsumowanie przed wyslaniem */}
                <div className="booking-summary">
                  <div className="bsum-row"><span>Usługa</span><strong>{selectedService?.name}</strong></div>
                  <div className="bsum-row"><span>Data i godzina</span><strong>{selectedDate} · {selectedSlot}</strong></div>
                  <div className="bsum-row"><span>Cena</span><strong>{selectedService?.price} zł</strong></div>
                </div>

                <button type="submit" className="booking-submit" disabled={submitting}>
                  {submitting ? 'Wysyłanie…' : `Zarezerwuj – ${selectedDate} ${selectedSlot}`}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
