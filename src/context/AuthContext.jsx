import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/apiClient";
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------
  // Load stored user on startup + validate token
  // --------------------------------------------
  useEffect(() => {
    const stored = localStorage.getItem("fundfeed_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      setTimeout(() => {
        fetchMe(parsed.access); // validate token, sync backend user
      }, 50);
    } else {
      setLoading(false);
    }
  }, []);

  // --------------------------------------------
  // Save user to state + localStorage
  // --------------------------------------------
  const saveUser = (userData) => {
    const updated = {
      savedPitches: userData.savedPitches || user?.savedPitches || [],
      ...userData,
    };

    setUser(updated);
    localStorage.setItem("fundfeed_user", JSON.stringify(updated));
  };

  // --------------------------------------------
  // Fetch backend user + saved pitches
  // --------------------------------------------
  const fetchMe = async (token) => {
    try {
      const res = await api.get("/auth/me/");
      saveUser({ ...res.data, access: token });

      await loadSavedPitches();
    } catch (err) {
      console.warn("Token invalid:", err);
    }

    setLoading(false);
  };

  // --------------------------------------------
  // Load saved pitches from backend
  // --------------------------------------------
  const loadSavedPitches = async () => {
    try {
      const res = await api.get("/api/pitches/saved/");
      const ids = res.data.map((item) => item.pitch.id);

      setUser((prev) => {
        const updated = { ...prev, savedPitches: ids };
        localStorage.setItem("fundfeed_user", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.warn("Couldn't load saved pitches:", err);
    }
  };

  // --------------------------------------------
  // LOGIN
  // --------------------------------------------
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login/", { email, password });

      saveUser({
        ...res.data.user,
        access: res.data.tokens.access,
        refresh: res.data.tokens.refresh,
      });

      await loadSavedPitches();
      toast.success('Welcome back!');

      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Invalid email or password";
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  // --------------------------------------------
  // REGISTER
  // --------------------------------------------
  const register = async (email, password, role, username) => {
    try {
      const res = await api.post("/auth/register/", {
        email,
        password,
        role,
        username,
      });

      saveUser({
        ...res.data.user,
        access: res.data.tokens.access,
        refresh: res.data.tokens.refresh,
      });

      await loadSavedPitches();
      toast.success('Account created successfully!');
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.email?.[0] || err.response?.data?.detail || "Registration failed";
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  // --------------------------------------------
  // SAVE PITCH
  // --------------------------------------------
  const savePitch = async (pitchId) => {
    try {
      await api.post(`/api/pitches/${pitchId}/save/`);

      // Update UI immediately
      setUser((prev) => {
        const updated = {
          ...prev,
          savedPitches: [...new Set([...(prev?.savedPitches || []), pitchId])],
        };
        localStorage.setItem("fundfeed_user", JSON.stringify(updated));
        return updated;
      });

      return { success: true };
    } catch (err) {
      toast.error('Failed to save pitch');
      return { success: false };
    }
  };

  // --------------------------------------------
  // UNSAVE PITCH
  // --------------------------------------------
  const removeSavedPitch = async (pitchId) => {
    try {
      await api.delete(`/api/pitches/${pitchId}/unsave/`);

      setUser((prev) => {
        const updated = {
          ...prev,
          savedPitches: prev.savedPitches.filter((id) => id !== pitchId),
        };
        localStorage.setItem("fundfeed_user", JSON.stringify(updated));
        return updated;
      });

      return { success: true };
    } catch (err) {
      toast.error('Failed to remove from saved');
      return { success: false };
    }
  };

  const isSaved = (pitchId) =>
    (user?.savedPitches || []).includes(pitchId);

  // --------------------------------------------
  const toggleSavePitch = async (pitchId) => {
    const alreadySaved = isSaved(pitchId);

    try {
      if (alreadySaved) {
        await api.delete(`/api/pitches/${pitchId}/unsave/`);
      } else {
        await api.post(`/api/pitches/${pitchId}/save/`);
      }

      setUser((prev) => {
        const updated = {
          ...prev,
          savedPitches: alreadySaved
            ? prev.savedPitches.filter((id) => id !== pitchId)
            : [...prev.savedPitches, pitchId],
        };

        localStorage.setItem("fundfeed_user", JSON.stringify(updated));
        return updated;
      });

      toast.success(alreadySaved ? 'Removed from saved' : 'Saved!');
      return { success: true };
    } catch (err) {
      toast.error('Action failed. Please try again.');
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout: () => {
          setUser(null);
          localStorage.removeItem("fundfeed_user");
          toast.success('Logged out successfully');
        },
        loading,
        savePitch,
        removeSavedPitch,
        toggleSavePitch,
        isSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
