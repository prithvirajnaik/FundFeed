/**
 * Role Selector Component
 * ----------------------------------------
 * Two choices:
 * - Developer
 * - Investor
 * 
 * Pass `selectedRole` + `setSelectedRole()` from Register page.
 */

export default function RoleSelector({ selectedRole, setSelectedRole }) {
  const roles = ["developer", "investor"];

  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">Select Role</p>

      <div className="grid grid-cols-2 gap-3">
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => setSelectedRole(role)}
            className={`border rounded-lg py-2 capitalize
              ${selectedRole === role ? "bg-blue-600 text-white" : "bg-white text-gray-700"}
            `}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}
