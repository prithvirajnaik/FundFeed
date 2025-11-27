/**
 * Reusable Input Component for Auth Forms
 * ----------------------------------------
 * This helps keep the Login & Register pages clean.
 * Accepts props like:
 * - label
 * - type
 * - value
 * - onChange
 * - placeholder
 */

export default function AuthInput({ label, type, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
