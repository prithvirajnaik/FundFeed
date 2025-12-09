import { useEffect, useState } from "react";
import api from "../../../api/apiClient";

export default function useRealFeed(search = "", filters = {}) {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (filters.stage) params.append("stage", filters.stage);
    if (filters.tags) params.append("tags", filters.tags);

    api.get(`/api/pitches/?${params.toString()}`)
      .then((res) => {
        setFeed(res.data.results || []);
      })
      .catch((err) => {
        console.error("Feed load error:", err);
        setFeed([]);
      });
  }, [search, filters]);

  return feed;
}
