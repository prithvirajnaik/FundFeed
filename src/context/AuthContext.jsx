/**
 * AuthContext
 * Handles:
 * - user global state
 * - login / register placeholders
 * - backend-ready structure
 * - localStorage persistence
 */

import { createContext, useState, useEffect } from "react";
import { loginApi, registerApi } from "../features/auth/api/authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { email, role, token }
  const [loading, setLoading] = useState(true);

  // Load stored user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("fundfeed_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  // const saveUser = (userData) => {
  //   setUser(userData);
  //   localStorage.setItem("fundfeed_user", JSON.stringify(userData));
  // };

  const saveUser = (userData) => {
    const updated = {
      savedPitches: user?.savedPitches || [],  // keep saved pitches
      ...userData,
    };

    setUser(updated);
    localStorage.setItem("fundfeed_user", JSON.stringify(updated));
  };

  /**
   * LOGIN FUNCTION (now backend-ready)
   * ---------------------------------
   * Calls loginApi() which later will call backend.
   * Right now, still uses mock response from loginApi().
   */
  const login = async (email, password) => {
    try {
      const response = await loginApi(email, password);

      if (!response.success) throw new Error(response.message);

      saveUser(response.user);
      return response;
    } catch (err) {
      console.error("Login Error:", err);
      return { success: false, message: err.message };
    }
  };

  /**
   * REGISTER FUNCTION (backend-ready)
   */
  const register = async (email, password, role) => {
    try {
      const response = await registerApi(email, password, role);

      if (!response.success) throw new Error(response.message);

      saveUser(response.user);
      return response;
    } catch (err) {
      console.error("Register Error:", err);
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fundfeed_user");
  };

  const savePitch = (pitchId) => {
    if (!user) return;

    const updated = {
      ...user,
      savedPitches: [...new Set([...(user.savedPitches || []), pitchId])]
    };

    setUser(updated);
    localStorage.setItem("fundfeed_user", JSON.stringify(updated));
  };

const removeSavedPitch = (pitchId) => {
  if (!user) return;

  const updated = {
    ...user,
    savedPitches: (user.savedPitches || []).filter(
      (id) => String(id) !== String(pitchId)
    )
  };

  setUser(updated);
  localStorage.setItem("fundfeed_user", JSON.stringify(updated));
};


  const isSaved = (pitchId) => {
    return (user?.savedPitches || []).includes(pitchId);
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, savePitch,removeSavedPitch,isSaved }}>
      {children}
    </AuthContext.Provider>
  );
}
