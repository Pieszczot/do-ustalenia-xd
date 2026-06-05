import { mockUsers } from '../mocks/users';
import { USE_MOCK, API_URL } from '../config';

function getCookie(name) {
  const value = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`));

  return value ? decodeURIComponent(value.split('=')[1]) : '';
}

function userFromApi(user) {
  if (!user) return null;

  return {
    ...user,
    firstName: user.first_name,
    lastName: user.last_name,
  };
}

async function throwApiError(res, fallback) {
  const err = await res.json().catch(() => ({}));
  if (Array.isArray(err.errors)) {
    throw new Error(err.errors.join(' '));
  }

  throw new Error(err.error || err.message || fallback);
}

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
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    await throwApiError(res, 'Błąd logowania.');
  }

  const data = await res.json();
  return { user: userFromApi(data.user) };
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
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    }),
  });
  if (!res.ok) {
    await throwApiError(res, 'Błąd rejestracji.');
  }

  return login(email, password);
}

export async function logout() {
  if (USE_MOCK) {
    return Promise.resolve();
  }

  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'X-CSRFToken': getCookie('csrftoken') },
  });
  if (!res.ok) {
    await throwApiError(res, 'Błąd wylogowania.');
  }
}

export async function currentUser() {
  if (USE_MOCK) {
    return null;
  }

  const res = await fetch(`${API_URL}/auth/me`, {
    credentials: 'include',
  });
  if (!res.ok) return null;

  const data = await res.json();
  return data.authenticated ? userFromApi(data.user) : null;
}
