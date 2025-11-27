export default function PitchActions({ saved, onSave, onContact }) {
  return (
    <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

        {/* Save */}
        <button
          onClick={onSave}
          className={`
            w-full sm:w-auto px-4 py-2 rounded-lg transition font-medium
            ${saved 
              ? "bg-orange-500 text-white shadow-md hover:bg-orange-600" 
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"}
          `}
        >
          {saved ? "Saved" : "Save Pitch"}
        </button>

        {/* Contact */}
        <button
          onClick={onContact}
          className="
            w-full sm:w-auto px-4 py-2 rounded-lg transition font-medium
            bg-black text-white 
            hover:bg-black/90
          "
        >
          Contact Developer
        </button>

      </div>
    </div>
  );
}
