import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
