import { mockSlots } from '../mocks/appointments';
import { USE_MOCK, API_URL } from '../config';

function getCookie(name) {
  const value = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`));

  return value ? decodeURIComponent(value.split('=')[1]) : '';
}

async function getCsrfToken() {
  let token = getCookie('csrftoken');
  if (token) return token;

  await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
  return getCookie('csrftoken');
}

export async function getAvailableSlots(date) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 400));
    return mockSlots[date] || [];
  }

  const res = await fetch(`${API_URL}/slots?date=${encodeURIComponent(date)}`, {
    credentials: 'include',
  });
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
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': await getCsrfToken(),
    },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) throw new Error('Błąd tworzenia rezerwacji');
  return res.json();
}
