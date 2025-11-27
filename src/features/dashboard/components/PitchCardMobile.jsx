import { Pencil, Trash2, Eye, Bookmark } from "lucide-react";

export default function PitchCardMobile({ pitch, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">

      <img
        src={pitch.thumbnail}
        className="w-full aspect-video rounded-lg object-cover bg-gray-200"
      />

      <h3 className="font-semibold text-lg mt-3 text-[#0f0f0f]">
        {pitch.title}
      </h3>

      <div className="flex gap-4 text-sm text-gray-700 mt-2">
        <span className="flex items-center gap-1">
          <Eye size={16} /> {pitch.views}
        </span>
        <span className="flex items-center gap-1">
          <Bookmark size={16} /> {pitch.saves}
        </span>
        <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">
          {pitch.stage}
        </span>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onEdit}
          className="flex-1 bg-orange-500 text-white py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
