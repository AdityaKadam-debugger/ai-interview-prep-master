// src/app.routes.jsx
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/hooks/useAuth'; // Aapka useAuth hook

import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Home from './features/interview/pages/Home';
import Interview from './features/interview/pages/interview'; // Ensure capital 'I' for component

// 🔐 Protected Route Wrapper Definition
const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">Loading...</div>;
  }

  // Agar user logged in nahi hai, redirect to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// 🚦 Router Configuration
export const router = createBrowserRouter([
  { 
    path: '/', 
    element: (
      <Protected>
        <Home />
      </Protected>
    ) 
  },
  { 
    path: '/interview/:interviewId', 
    element: (
      <Protected>
        <Interview />
      </Protected>
    ) 
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);