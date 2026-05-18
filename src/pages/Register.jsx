import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.passwordConfirm) {
      setError('Hasła nie są identyczne.');
      return;
    }
    if (form.password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków.');
      return;
    }

    setLoading(true);
    try {
      await register(form.email, form.password, form.firstName, form.lastName);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <div className="auth-logo">🐾</div>
        <h1 className="auth-title">Utwórz konto</h1>
        <p className="auth-sub">Zarejestruj się i rezerwuj wizyty online.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Imię</label>
              <input
                type="text"
                name="firstName"
                placeholder="Jan"
                value={form.firstName}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Nazwisko</label>
              <input
                type="text"
                name="lastName"
                placeholder="Kowalski"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Adres e-mail</label>
            <input
              type="email"
              name="email"
              placeholder="jan@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Hasło</label>
              <input
                type="password"
                name="password"
                placeholder="min. 6 znaków"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Powtórz hasło</label>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="••••••••"
                value={form.passwordConfirm}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Rejestracja…' : 'Zarejestruj się'}
          </button>
        </form>

        <p className="auth-switch">
          Masz już konto?{' '}
          <Link to="/logowanie">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
}
