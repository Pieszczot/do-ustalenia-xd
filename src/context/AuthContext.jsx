import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService, logout as logoutService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const savedToken = localStorage.getItem('vet_token');
    const savedUser = localStorage.getItem('vet_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginService(email, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('vet_token', data.token);
    localStorage.setItem('vet_user', JSON.stringify(data.user));
  };

  const register = async (email, password, firstName, lastName) => {
    const data = await registerService(email, password, firstName, lastName);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('vet_token', data.token);
    localStorage.setItem('vet_user', JSON.stringify(data.user));
  };

  const logout = async () => {
    await logoutService();
    setToken(null);
    setUser(null);
    localStorage.removeItem('vet_token');
    localStorage.removeItem('vet_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth musi być użyty wewnątrz AuthProvider');
  return ctx;
}
