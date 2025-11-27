import { Link } from "react-router-dom";

export default function DeveloperCard({ developer }) {
  return (
    <Link
      to={`/profile/${developer.id}`}
      className="flex items-center gap-4 mt-6 p-4 bg-white rounded-xl shadow hover:bg-gray-50"
    >
      <img
        src={developer.avatar}
        className="w-14 h-14 rounded-full object-cover"
        alt="dev avatar"
      />
      <div>
        <p className="font-semibold">{developer.name}</p>
        <p className="text-sm text-gray-600">{developer.role}</p>
        <p className="text-xs text-primary">{developer.location}</p>
      </div>
    </Link>
  );
}
