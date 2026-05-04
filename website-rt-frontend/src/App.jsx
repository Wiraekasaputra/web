import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';

// Admin pages
//import Dashboard from './pages/admin/Dashboard';
//import DataWarga from './pages/admin/DataWarga';
//import DataKeuangan from './pages/admin/DataKeuangan';
//import Gallery from './pages/admin/Gallery';
//import Inventaris from './pages/admin/Inventaris';
//import AcaraMendatang from './pages/admin/AcaraMendatang';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/warga"
        element={
          <ProtectedRoute>
            <DataWarga />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/keuangan"
        element={
          <ProtectedRoute>
            <DataKeuangan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/inventaris"
        element={
          <ProtectedRoute>
            <Inventaris />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/acara"
        element={
          <ProtectedRoute>
            <AcaraMendatang />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;