import { mockUsers } from '../mocks/users';
import { USE_MOCK, API_URL } from '../config';

export async function login(email, password) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 600)); // symulowane opoznienie
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) throw new Error('Nieprawidłowy e-mail lub hasło.');
    const { password: _, ...safeUser } = user; // nie zwracamy hasła
    return { token: 'mock-token-' + user.id, user: safeUser };
  }

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Błąd logowania.');
  }
  return res.json();
}

export async function register(email, password, firstName, lastName) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 600));
    const exists = mockUsers.find((u) => u.email === email);
    if (exists) throw new Error('Konto z tym e-mailem już istnieje.');
    const newUser = {
      id: mockUsers.length + 1,
      email,
      password,
      firstName,
      lastName,
    };
    mockUsers.push(newUser);
    const { password: _, ...safeUser } = newUser;
    return { token: 'mock-token-' + newUser.id, user: safeUser };
  }

  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, firstName, lastName }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Błąd rejestracji.');
  }
  return res.json();
}

export function logout() {
  // logout jak bedzie prawdziwe api
  return Promise.resolve();
}
