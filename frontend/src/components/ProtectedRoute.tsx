import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  role?: 'student' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;