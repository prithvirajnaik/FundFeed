import { useEffect, useState } from "react";
import { fetchRequests, markRequestViewed } from "../api/requestsApi";

export default function useRequests(box = "inbox") {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRequests();
  }, [box]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchRequests(box);
      setRequests(data.results || data);
    } catch (err) {
      console.error("Failed to load requests", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const markViewed = async (id) => {
    try {
      await markRequestViewed(id);
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, viewed: true } : r
        )
      );
    } catch (err) {
      console.error("Failed to mark request as viewed", err);
    }
  };

  return {
    requests,
    loading,
    error,
    markViewed,
    refresh: loadRequests
  };
}
