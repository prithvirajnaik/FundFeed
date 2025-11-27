/**
 * useAuthForm()
 * ----------------------------------------
 * A reusable hook to handle email/password form data.
 * Keeps our Login & Register pages clean.
 */

import { useState } from "react";

export default function useAuthForm(initial = { email: "", password: "" }) {
  const [form, setForm] = useState(initial);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return {
    form,
    updateField,
  };
}
