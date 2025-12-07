import { useState } from "react";
import AuthInput from "../components/AuthInput";
import useAuthForm from "../hooks/useAuthForm";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { form, updateField } = useAuthForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Call Django login through AuthContext
    const response = await login(form.email, form.password);

    if (response.success) {
      navigate("/feed");
    } else {
      setError(response.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(val) => updateField("email", val)}
        />

        <div className="mt-3">
          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(val) => updateField("password", val)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg mt-5 hover:bg-opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
}
