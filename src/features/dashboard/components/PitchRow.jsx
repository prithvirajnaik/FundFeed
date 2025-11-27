import { Pencil, Trash2 } from "lucide-react";

export default function PitchRow({ pitch, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-6 items-center p-4 border-b text-sm text-gray-700">

      {/* Thumbnail + title */}
      <div className="col-span-2 flex items-center gap-4">
        <img
          src={pitch.thumbnail}
          className="w-24 h-14 rounded-lg object-cover bg-gray-200"
        />
        <span className="font-semibold line-clamp-2">{pitch.title}</span>
      </div>

      <div>{pitch.views}</div>
      <div>{pitch.saves}</div>
      <div>{pitch.stage}</div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={onEdit}>
          <Pencil size={18} className="text-orange-600 hover:text-orange-800" />
        </button>
        <button onClick={onDelete}>
          <Trash2 size={18} className="text-red-500 hover:text-red-700" />
        </button>
      </div>

    </div>
  );
}
