import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // czekamy na wczytanie sesji z localstorage

  if (!isLoggedIn) {
    // user wraca tam skad przyszedl
    return <Navigate to="/logowanie" state={{ from: location }} replace />;
  }

  return children;
}
