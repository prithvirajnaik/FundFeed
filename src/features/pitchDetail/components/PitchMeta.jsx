import { Link } from "react-router-dom";
import { Eye, Bookmark } from "lucide-react";

export default function PitchMeta({ title, description, tags, developer, views, saves }) {
  return (
    <div className="space-y-5">

      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-[#0f0f0f] leading-tight">
        {title}
      </h1>

      {/* Developer Info */}
      {developer && (
        <Link
          to={`/profile/${developer.id}`}
          className="
            flex items-center gap-3 sm:gap-4
            bg-white 
            py-2 px-2
            rounded-lg
            transition
            hover:bg-orange-50/40
          "
        >
          <img
            src={developer.avatar}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
            alt="developer avatar"
          />

          <div className="flex flex-col">
            <span className="font-semibold text-[#0f0f0f]">
              {developer.name}
            </span>

            <span className="text-sm text-gray-600">
              {developer.role}
            </span>

            {developer.location && (
              <span className="text-xs text-orange-600 mt-[2px]">
                {developer.location}
              </span>
            )}
          </div>
        </Link>
      )}

      {/* Views + Saves */}
      <div className="flex items-center gap-5 text-gray-700 text-sm sm:text-base">
        <span className="flex items-center gap-1">
          <Eye size={18} /> {views.toLocaleString()}
        </span>

        <span className="flex items-center gap-1">
          <Bookmark size={18} /> {saves.toLocaleString()}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="
              bg-orange-200 text-orange-900 
              text-[10px] sm:text-xs 
              px-2 py-[4px] 
              rounded-md
            "
          >
            {tag}
          </span>
        ))}
      </div>

    </div>
  );
}
