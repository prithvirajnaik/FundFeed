import { MapPin, Edit } from "lucide-react";

export default function ProfileHeader({ profile, isOwner, onEdit }) {
  console.log(profile.avatar)
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

        {/* Avatar */}
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-yellow-400 to-orange-600 shadow-lg">
            <img
              src={import.meta.env.VITE_API_URL + profile.avatar}
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
              alt={profile.name}
            />
          </div>
        </div>
{/* <h1>{import.meta.env.VITE_API_URL+profile.avatar}</h1> */}
        {/* Info */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              {profile.title && (
                <p className="text-base text-gray-600 mt-1 font-medium">
                  {profile.title}
                </p>
              )}
            </div>

            {isOwner && (
              <button
                onClick={onEdit}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg text-sm transition-all border border-gray-300 shadow-sm flex items-center gap-2"
              >
                <Edit size={16} />
                Edit Profile
              </button>
            )}
          </div>

          {/* Stats
          <div className="flex justify-center md:justify-start gap-6 text-sm mb-6">
            <Stat label="posts" value="0" />
            <Stat label="connections" value="0" />
            <Stat label="views" value="0" />
          </div> */}

          {/* Location */}
          {profile.location && (
            <div className="flex justify-center md:justify-start items-center gap-2 text-gray-600 text-sm mt-1">
              <MapPin size={16} />
              <span>{profile.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <span className="font-bold text-gray-900 text-lg leading-none">{value}</span>
      <span className="text-gray-600 text-xs uppercase tracking-wide">{label}</span>
    </div>
  );
}
