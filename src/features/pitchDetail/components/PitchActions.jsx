import { Bookmark, Eye } from "lucide-react";

export default function PitchActions({ views, saves, onSave, onContact }) {
  return (
    <div className="mt-5 flex items-center justify-between">

      <div className="flex items-center gap-5 text-gray-700">
        <span className="flex items-center gap-1">
          <Eye size={18} /> {views}
        </span>

        <span className="flex items-center gap-1">
          <Bookmark size={18} /> {saves}
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
        >
          Save Pitch
        </button>

        <button
          onClick={onContact}
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90"
        >
          Contact Developer
        </button>
      </div>

    </div>
  );
}
