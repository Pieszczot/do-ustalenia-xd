import { mockSlots } from '../mocks/appointments';
import { USE_MOCK, API_URL } from '../config';

function getCookie(name) {
  const value = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`));

  return value ? decodeURIComponent(value.split('=')[1]) : '';
}

export async function getAvailableSlots(date) {
  await new Promise((r) => setTimeout(r, 400));
  return mockSlots[date] || [];
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
      'X-CSRFToken': getCookie('csrftoken'),
    },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) throw new Error('Błąd tworzenia rezerwacji');
  return res.json();
}
