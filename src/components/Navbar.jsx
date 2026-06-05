import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAnchorClick = (e, anchor) => {
    setMenuOpen(false);
    if (window.location.pathname !== '/') {
      e.preventDefault();
      window.location.href = '/' + anchor;
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <div className="navbar-logo-icon">
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M12 2C9.8 2 8 3.8 8 6s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-6 7C4.3 9 3 10.3 3 12s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm12 0c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm-6 4c-3.3 0-6 2.7-6 6v1h12v-1c0-3.3-2.7-6-6-6z" />
          </svg>
        </div>
        VetKlinika
      </Link>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Strona główna</NavLink></li>
        <li><a href="#jak-to-dziala" onClick={(e) => handleAnchorClick(e, '#jak-to-dziala')}>Jak to działa</a></li>
        <li><a href="#cennik" onClick={(e) => handleAnchorClick(e, '#cennik')}>Cennik</a></li>
      </ul>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <div className="navbar-user">
              <div className="navbar-avatar">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <span className="navbar-username">{user.firstName}</span>
            </div>
            <button className="navbar-logout" onClick={handleLogout}>
              Wyloguj się
            </button>
          </>
        ) : (
          <>
            <Link to="/logowanie" className="navbar-login">Zaloguj się</Link>
            <Link to="/rejestracja" className="navbar-cta">Zarejestruj się</Link>
          </>
        )}
        <button
          className="navbar-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

