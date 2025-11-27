import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// import usePitchDetail from "../hooks/usePitchDetail";
import usePitchDetail from "../../pitchDetail/hooks/usePitchDetail";
// import VideoUploader from "../../upload/components/VideoUploader";
import VideoUploader from "../../upload/components/VideoUploader";
import PitchFormFields from "../../upload/components/PitchFormFields";
import TagInput from "../../upload/components/TagInput";

export default function EditPitch() {
  const { id } = useParams();
  const pitch = usePitchDetail(id);

  const [form, setForm] = useState(null);

  useEffect(() => {
    if (pitch) {
      setForm({
        title: pitch.title,
        description: pitch.description,
        stage: pitch.stage,
        ask: pitch.ask,
        tags: Array.isArray(pitch.tags) ? pitch.tags : [],
        video: null,
        thumbnail: pitch.thumbnail
      });
    }
  }, [pitch]);

  const update = (key, value) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    console.log("UPDATED PITCH →", form);
    alert("Changes saved (mock)");
  };

  if (!form) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-orange-600">
        Edit Pitch
      </h1>

      <VideoUploader
        video={form.video}
        setVideo={(file) => update("video", file)}
        existingThumbnail={form.thumbnail}
      />

      <PitchFormFields form={form} update={update} />

      <TagInput tags={form.tags} setTags={(t) => update("tags", t)} />

      <button
        onClick={handleSave}
        className="w-full py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700"
      >
        Save Changes
      </button>

    </div>
  );
}
