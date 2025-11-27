import { useState } from "react";
import AuthInput from "../components/AuthInput";
import RoleSelector from "../components/RoleSelector";
import useAuthForm from "../hooks/useAuthForm";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
/**
 * Register Page
 * Calls AuthContext.register() to create mock user.
 */

export default function Register() {
  const { form, updateField } = useAuthForm();
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // This creates a MOCK USER (backend-ready)
    const response = await register(form.email, form.password, role);
    if(response){
      navigate("/feed")
    }

    console.log("REGISTER MOCK USER:", response);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>

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

        <div className="mt-4">
          <RoleSelector selectedRole={role} setSelectedRole={setRole} />
        </div>

        <button
          type="submit"
          disabled={!role}
          className={`w-full py-2 rounded-lg mt-5 ${
            role
              ? "bg-primary text-white hover:bg-opacity-90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Register
        </button>
      </form>
    </div>
  );
}
