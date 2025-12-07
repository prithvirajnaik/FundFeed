import { Bookmark } from "lucide-react";
import { useState, useEffect } from "react";

export default function PitchActions({ saved, onSave, onContact }) {
  const [animate, setAnimate] = useState(false);

  // trigger animation when 'saved' changes
  useEffect(() => {
    if (saved) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
  }, [saved]);

  return (
    <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

        {/* Save / Saved */}
        <button
          onClick={onSave}
          className={`
            w-full sm:w-auto px-4 py-2 rounded-lg transition font-medium flex items-center justify-center gap-2
            ${saved 
              ? "bg-orange-500 text-white hover:bg-orange-600" 
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"}
          `}
        >
          <Bookmark 
            className={`
              ${saved ? "fill-white" : ""}
              ${animate ? "pop-anim" : ""}
            `}
            size={18} 
          />
          {saved ? "Saved" : "Save Pitch"}
        </button>

        <button
          onClick={onContact}
          className="w-full sm:w-auto px-4 py-2 rounded-lg transition font-medium bg-black text-white hover:bg-black/90"
        >
          Contact Developer
        </button>

      </div>
    </div>
  );
}
