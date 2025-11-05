import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: Props) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
