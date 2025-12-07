import { useState, useEffect } from "react";
import api from "../../../api/apiClient";

export default function usePitchDetail(id) {
  const [pitch, setPitch] = useState(null);

  useEffect(() => {
    api.get(`/api/pitches/${id}/`).then(res => setPitch(res.data));
  }, [id]);

  return pitch;
}
