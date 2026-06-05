import { mockSlots } from '../mocks/appointments';
import { USE_MOCK, API_URL } from '../config';

export async function getAvailableSlots(date) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 400));
    return mockSlots[date] || [];
  }

  const res = await fetch(`${API_URL}/slots?date=${date}`);
  if (!res.ok) throw new Error('Błąd pobierania terminów');
  return res.json();
}

export async function createBooking(bookingData) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 600));
    console.log('Mock rezerwacja:', bookingData);
    return { success: true, id: Math.floor(Math.random() * 10000) };
  }

  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('vet_token')}`,
    },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) throw new Error('Błąd tworzenia rezerwacji');
  return res.json();
}
