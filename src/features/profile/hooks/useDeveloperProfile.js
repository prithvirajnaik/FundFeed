import { useState, useEffect } from "react";
import api from "../../../api/apiClient";

/**
 * Fetch developer profile from backend API.
 */
export default function useDeveloperProfile(id) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/accounts/profile/${id}/`);

      // Transform backend data to match component expectations
      const transformed = {
        id: res.data.user.id,
        name: res.data.user.username || res.data.user.email.split('@')[0],
        title: res.data.profile?.title || "",
        bio: res.data.profile?.bio || "",
        avatar: res.data.user.avatar_url || "/avatar1.png",
        location: res.data.user.location || "",
        skills: res.data.profile?.skills || [],
        links: {
          github: res.data.profile?.github || "",
          portfolio: res.data.profile?.portfolio || "",
          linkedin: res.data.profile?.linkedin || "",
        }
      };

      setProfile(transformed);
    } catch (err) {
      console.error("Failed to fetch developer profile:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  return { profile, loading, error, refetch: fetchProfile };
}
