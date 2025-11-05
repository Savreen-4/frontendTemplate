import { FC, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';
import { ErrorsPage } from '../modules/errors/ErrorsPage';
import { Logout, AuthPage } from '../modules/auth';
import { App } from '../App';
import { RequireAuth } from './RequireAuth';

const AppRoutes: FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleStorageChange() {
      setIsAuthenticated(!!localStorage.getItem('token'));
    }

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route element={<App />}>
        <Route path="error/*" element={<ErrorsPage />} />
        <Route path="logout" element={<Logout />} />

        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />} />

        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <RequireAuth>
                <PrivateRoutes />
              </RequireAuth>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export { AppRoutes };
