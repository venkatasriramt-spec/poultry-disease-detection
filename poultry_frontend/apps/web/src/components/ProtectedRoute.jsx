
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requireAuth = false }) {
  if (requireAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}
