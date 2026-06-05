import { mockPrices } from '../mocks/prices';
import { USE_MOCK, API_URL } from '../config';

function serviceFromApi(service) {
  return {
    ...service,
    price: service.price_from,
    unit: 'wizyta',
    icon: '🐾',
    popular: false,
  };
}

export async function getPrices() {
  if (USE_MOCK) {
    // do usuniecia jak bedzie prawdziwe api
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockPrices;
  }

  const res = await fetch(`${API_URL}/services`);
  if (!res.ok) throw new Error('Błąd pobierania cennika');
  const data = await res.json();
  return data.map(serviceFromApi);
}
