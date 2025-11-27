export default function DeletePitchModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-80 text-center space-y-4">

        <h2 className="text-xl font-semibold">Delete Pitch?</h2>
        <p className="text-gray-600 text-sm">
          This action cannot be undone.
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-red-600 text-white"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
