import { useState } from "react";
import VideoUploader from "../../upload/components/VideoUploader";
import PitchFormFields from "../../upload/components/PitchFormFields";
import TagInput from "../../upload/components/TagInput";

export default function EditPitchModal({ pitch, onClose, onSave }) {
  const [form, setForm] = useState({
    title: pitch?.title || "",
    description: pitch?.description || "",
    stage: pitch?.stage || "",
    ask: pitch?.ask || "",
    tags: Array.isArray(pitch?.tags) ? [...pitch.tags] : [],
    video: null,
    thumbnail: pitch?.thumbnail || "",
  });


  const update = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = () => {
    const updatedPayload = {
      ...pitch,
      ...form,
      tags: form.tags,
      video: form.video ?? pitch.video, // keep old video unless replaced
    };

    onSave(updatedPayload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-5 shadow-xl">

        <h2 className="text-xl font-semibold text-[#0f0f0f]">Edit Pitch</h2>

        {/* VIDEO UPLOADER (optional change) */}
        <div className="bg-gray-50 rounded-lg p-3 border">
          <VideoUploader
            video={form.video}
            setVideo={(file) => update("video", file)}
            existingThumbnail={pitch.thumbnail}
          />
        </div>

        {/* FORM FIELDS */}
        <PitchFormFields form={form} update={update} />

        {/* TAGS */}
        <TagInput
          tags={form.tags}
          setTags={(t) => update("tags", t)}
        />

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border bg-white hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              flex-1 py-2 rounded-lg 
              bg-orange-600 text-white font-semibold 
              hover:bg-orange-700
            "
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
