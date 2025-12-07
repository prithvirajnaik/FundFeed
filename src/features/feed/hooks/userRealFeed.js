import { useEffect, useState } from "react";
import api from "../../../api/apiClient";

export default function useRealFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    api.get("/api/pitches/")
      .then((res) => {
        console.log("PITCH FEED:", res.data);
        setFeed(res.data.results || []);   // ✅ FIX
      })
      .catch((err) => {
        console.error("Feed load error:", err);
        setFeed([]);                       // prevent crash
      });
  }, []);

  return feed;
}
