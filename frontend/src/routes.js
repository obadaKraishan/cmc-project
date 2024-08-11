import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ContentEditor from './components/Dashboard/ContentEditor';
import MediaManager from './components/Dashboard/MediaManager';
import UserRoles from './components/Dashboard/UserRoles';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/content-editor" element={<ProtectedRoute><ContentEditor /></ProtectedRoute>} />
      <Route path="/media-manager" element={<ProtectedRoute><MediaManager /></ProtectedRoute>} />
      <Route path="/user-roles" element={<ProtectedRoute><UserRoles /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
