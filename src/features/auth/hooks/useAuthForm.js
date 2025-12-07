/**
 * useAuthForm()
 * ----------------------------------------
 * Handles username, email, and password.
 * Shared by Login & Register pages.
 */

import { useState } from "react";

export default function useAuthForm(
  initial = { username: "", email: "", password: "" }
) {
  const [form, setForm] = useState(initial);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return {
    form,
    updateField,
  };
}
