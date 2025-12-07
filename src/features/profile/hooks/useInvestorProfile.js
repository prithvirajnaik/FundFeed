import { useEffect, useState } from "react";
import api from "../../../api/apiClient";

export default function useInvestorProfile(id) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/accounts/profile/${id}/`);

      const transformed = {
        id: res.data.user.id,
        name: res.data.user.username || res.data.user.email.split('@')[0],
        firm: res.data.profile?.firm || "",
        type: res.data.profile?.investor_type || "",
        stages: res.data.profile?.stages || [],
        sectors: res.data.profile?.sectors || [],
        contactPreference: res.data.profile?.contact_preference || "email",
        avatar: res.data.user.avatar_url || "/investorAvatar.png",
        location: res.data.user.location || "",
        links: {
          linkedin: res.data.profile?.linkedin || "",
          website: res.data.profile?.website || "",
        },
        bio: res.data.profile?.bio || "",
      };

      setProfile(transformed);
    } catch (err) {
      console.error("Failed to fetch investor profile:", err);
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
