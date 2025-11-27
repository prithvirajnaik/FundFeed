import { useState } from "react";
//Handles form state, validation, etc.

export default function useUploadForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: [],
    stage: "",
    ask: "",
    video: null,
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return { form, update };
}
