import { useState } from "react";
import useAuthForm from "../hooks/useAuthForm";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import FormField from "../../../components/FormField";
import LoadingButton from "../../../components/LoadingButton";

export default function Login() {
  const { form, updateField } = useAuthForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Call Django login through AuthContext
    const response = await login(form.email, form.password);

    if (response.success) {
      navigate("/feed");
    } else {
      setLoading(false);
      // Backend errors might be handled in AuthContext's toast, 
      // but we can also set general error if really needed
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        noValidate
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
          required
        />

        <FormField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          error={errors.password}
          required
        />

        <LoadingButton
          type="submit"
          loading={loading}
          className="w-full bg-primary text-white py-2 rounded-lg mt-5 hover:bg-opacity-90"
        >
          Login
        </LoadingButton>
      </form>
    </div>
  );
}
