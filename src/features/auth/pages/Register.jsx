import { useState } from "react";
import RoleSelector from "../components/RoleSelector";
import useAuthForm from "../hooks/useAuthForm";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import FormField from "../../../components/FormField";
import LoadingButton from "../../../components/LoadingButton";

export default function Register() {
  const { form, updateField } = useAuthForm();
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = "Username is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";

    if (!form.password) {
      newErrors.password = "Password is required";
    } else {
      if (form.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(form.password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
      } else if (!/[0-9]/.test(form.password)) {
        newErrors.password = "Password must contain at least one number";
      }
    }

    if (!role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const response = await register(
      form.email,
      form.password,
      role,
      form.username
    );

    if (response.success) {
      navigate("/feed");
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        noValidate
      >
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>

        {/* USERNAME */}
        <FormField
          label="Username"
          type="text"
          name="username"
          placeholder="Choose a username"
          value={form.username}
          onChange={(e) => updateField("username", e.target.value)}
          error={errors.username}
          required
        />

        {/* EMAIL */}
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

        {/* PASSWORD */}
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

        {/* ROLE */}
        <div className="mt-4">
          <RoleSelector selectedRole={role} setSelectedRole={setRole} />
          {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
        </div>

        {/* SUBMIT */}
        <LoadingButton
          type="submit"
          loading={loading}
          disabled={!role}
          className={`w-full py-2 rounded-lg mt-5 ${role
            ? "bg-primary text-white hover:bg-opacity-90"
            : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          Register
        </LoadingButton>
      </form>
    </div>
  );
}
