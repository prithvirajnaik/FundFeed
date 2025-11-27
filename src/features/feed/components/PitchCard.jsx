import VideoPreview from "./VideoPreview";
import { Bookmark, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function PitchCard({ pitch }) {
  return (
    <Link to={`/pitch/${pitch.id}`}>
      <div
        className="
          bg-[#f9f9f9] 
          p-2
          rounded-xl overflow-hidden 
          transition-all duration-200 
          /* ⭐ Corners become sharp */
          hover:bg-orange-50           /* ⭐ Transparent orange overlay */
          hover:-translate-y-[2px]
        "
      >
        {/* Thumbnail (16:9) */}
        <div className="w-full aspect-video bg-[#f1f1f1]">
          <VideoPreview src={pitch.videoUrl} thumbnail={pitch.thumbnail} />
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">

          {/* Title */}
          <h2 className="text-[15px] font-semibold text-[#0f0f0f] line-clamp-2 leading-snug h-[40px]">
            {pitch.title}
          </h2>

          {/* Tags */}
          <div className="flex gap-1 flex-wrap h-[28px] overflow-hidden">
            {pitch.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="
                  bg-orange-200 text-orange-900 
                  px-2 py-[2px] rounded-md 
                  text-[10px] font-medium
                "
              >
                {tag}
              </span>
            ))}

            {pitch.tags.length > 3 && (
              <span className="text-[10px] text-gray-600">
                +{pitch.tags.length - 3}
              </span>
            )}
          </div>

          {/* Bottom Meta */}
          <div className="flex justify-between items-center mt-auto text-[#606060] text-xs h-[20px]">
            <span className="flex items-center gap-1">
              <Eye size={14} /> {pitch.views}
            </span>
            <span className="flex items-center gap-1">
              <Bookmark size={14} /> {pitch.saves}
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}
