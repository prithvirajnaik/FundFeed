// import PitchFormFields from "../../components/PitchFormFields";
import { useState } from "react";
import PitchFormFields from "../../upload/components/PitchFormFields";

export default function EditPitchModal({ pitch, onClose, onSave }) {
  const [form, setForm] = useState({ ...pitch });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-4">

        <h2 className="text-xl font-semibold">Edit Pitch</h2>

        <PitchFormFields form={form} update={update} />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="flex-1 py-2 rounded-lg bg-orange-600 text-white"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
