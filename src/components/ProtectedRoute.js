import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth(); // Assume useAuth provides user data

  // If user is authenticated, render the child routes
  if (user) {
    return <Outlet />;
  }

  // If not authenticated, redirect to the login page
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
