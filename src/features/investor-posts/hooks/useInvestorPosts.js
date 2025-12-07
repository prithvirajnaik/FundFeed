import { useState, useEffect } from "react";
import { fetchInvestorPosts } from "../api/investorPostsApi";

export default function useInvestorPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchInvestorPosts();
      setPosts(data.results || data);
    } catch (err) {
      console.error("Failed to load investor posts", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return posts;
}
