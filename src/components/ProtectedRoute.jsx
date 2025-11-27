/**
 * ProtectedRoute Component
 * Blocks access unless:
 * - user is logged in
 * 
 * Usage:
 * <ProtectedRoute>
 *    <Feed />
 * </ProtectedRoute>
 */

import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // while checking auth (localStorage read)
  if (loading) return <div className="text-center mt-10">Loading...</div>;

  // if user not logged in
  if (!user) return <Navigate to="/login" replace />;

  // allowed
  return children;
}
