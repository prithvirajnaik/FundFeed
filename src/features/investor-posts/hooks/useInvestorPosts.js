import { useState, useEffect } from "react";
import { fetchInvestorPosts } from "../api/investorPostsApi";

export default function useInvestorPosts(search = "", filters = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, [search, filters]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const params = { search, ...filters };
      const data = await fetchInvestorPosts(params);
      setPosts(data.results || data);
    } catch (err) {
      console.error("Failed to load investor posts", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data: posts, loading, error };
}
