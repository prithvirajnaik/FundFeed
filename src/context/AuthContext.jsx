import { createContext, useState, useEffect } from "react";
import api from "../api/apiClient";

export const AuthContext = createContext();

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
    try   {
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
      const res = await api.get("/pitches/saved/");
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

      return { success: true };
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      return { success: false, message: "Login failed" };
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
      return { success: true };
    } catch (err) {
      console.error("Register Error:", err.response?.data);
      return { success: false, message: "Registration failed" };
    }
  };

  // --------------------------------------------
  // SAVE PITCH
  // --------------------------------------------
  const savePitch = async (pitchId) => {
    try {
      await api.post(`/pitches/${pitchId}/save/`);

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
      console.error("SavePitch Error:", err.response?.data);
      return { success: false };
    }
  };

  // --------------------------------------------
  // UNSAVE PITCH
  // --------------------------------------------
  const removeSavedPitch = async (pitchId) => {
    try {
      await api.delete(`/pitches/${pitchId}/unsave/`);

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
      console.error("Unsave Error:", err.response?.data);
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
      await api.delete(`/pitches/${pitchId}/unsave/`);
    } else {
      await api.post(`/pitches/${pitchId}/save/`);
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

    return { success: true };
  } catch (err) {
    console.error("ToggleSave Error:", err.response?.data);
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
