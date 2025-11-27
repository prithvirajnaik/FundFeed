import VideoPreview from "./VideoPreview";
import { Bookmark, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function PitchCard({ pitch }) {
  return (
     <Link to={`/pitch/${pitch.id}`}>
    <div className="bg-white p-4 rounded-xl shadow">
      
      <VideoPreview src={pitch.videoUrl} thumbnail={pitch.thumbnail} />

      <h2 className="mt-3 text-lg font-semibold">{pitch.title}</h2>

      <div className="flex gap-2 flex-wrap mt-2">
        {pitch.tags.map((tag) => (
          <span 
            key={tag}
            className="bg-gold text-black px-2 py-1 rounded-md text-xs font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
        <span className="flex items-center gap-1">
          <Eye size={16} /> {pitch.views}
        </span>
        <span className="flex items-center gap-1">
          <Bookmark size={16} /> {pitch.saves}
        </span>
      </div>

    </div>
    </Link>
  );
}
