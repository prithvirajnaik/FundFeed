import { useState, useEffect } from "react";
import api from "../../../api/apiClient";

export default function useSavedPitches() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    api.get("/pitches/saved/")
      .then(res => setSaved(res.data.map(item => item.pitch)))
      .catch(err => console.error("Saved fetch error", err));
  }, []);

  return saved;
}
