import { useState, useEffect, useRef } from "react";
// import api from "../api/apiClient"; // or mock fetch

export default function useInfiniteFeed(limit = 8) {
  const [pitches, setPitches] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await api.get(`/api/pitches?page=${page}&limit=${limit}`);

      const newData = res.data.data;

      setPitches(prev => [...prev, ...newData]);
      setHasMore(res.data.hasMore);
      setPage(prev => prev + 1);

    } catch (err) {
      console.error("Feed load error:", err);
    }

    setLoading(false);
  };

  // run observer
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, { threshold: 1 });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loaderRef.current]);

  useEffect(() => {
    loadMore();
  }, []);

  return { pitches, loaderRef, loading };
}
