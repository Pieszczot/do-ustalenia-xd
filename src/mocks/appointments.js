// Dostępne godziny dla każdego dnia
// true = wolne, false = zajęte

const today = new Date();

const formatDate = (date) => date.toISOString().split('T')[0];

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

// sloty na najbliższe 14 dni
export const mockSlots = {
  [formatDate(addDays(today, 1))]: [
    { time: '08:00', available: true },
    { time: '09:00', available: false },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '12:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: false },
  ],
  [formatDate(addDays(today, 2))]: [
    { time: '08:00', available: false },
    { time: '09:00', available: true },
    { time: '10:00', available: false },
    { time: '11:00', available: true },
    { time: '12:00', available: true },
    { time: '14:00', available: false },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
  ],
  [formatDate(addDays(today, 3))]: [], 
  [formatDate(addDays(today, 4))]: [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: false },
    { time: '16:00', available: true },
  ],
  [formatDate(addDays(today, 5))]: [
    { time: '08:00', available: true },
    { time: '09:00', available: true },
    { time: '10:00', available: false },
    { time: '11:00', available: false },
    { time: '14:00', available: true },
  ],
  [formatDate(addDays(today, 7))]: [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '12:00', available: true },
    { time: '14:00', available: false },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
  ],
  [formatDate(addDays(today, 8))]: [
    { time: '08:00', available: false },
    { time: '09:00', available: false },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
  ],
  [formatDate(addDays(today, 9))]: [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: false },
  ],
  [formatDate(addDays(today, 10))]: [],
  [formatDate(addDays(today, 11))]: [
    { time: '08:00', available: true },
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
  ],
};
