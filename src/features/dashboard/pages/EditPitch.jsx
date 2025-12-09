import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import usePitchDetail from "../../pitchDetail/hooks/usePitchDetail";
import VideoUploader from "../../upload/components/VideoUploader";
import PitchFormFields from "../../upload/components/PitchFormFields";
import TagInput from "../../upload/components/TagInput";
import { updatePitch } from "../api/dashboardApi";

export default function EditPitch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pitch = usePitchDetail(id);

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (pitch) {
      setForm({
        title: pitch.title,
        description: pitch.description,
        stage: pitch.funding_stage || pitch.stage, // Handle both cases
        ask: pitch.ask,
        tags: Array.isArray(pitch.tags) ? pitch.tags : [],
        video: null, // New video file
        existingVideo: pitch.video_url,
        thumbnail: pitch.thumbnail
      });
    }
  }, [pitch]);

  const update = (key, value) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (!form.title || !form.description) return alert("Title and description are required");

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("funding_stage", form.stage);
      formData.append("ask", form.ask);

      // Backend expects JSON string for list fields if using FormData with JSONField
      formData.append("tags", JSON.stringify(form.tags));

      if (form.video) {
        formData.append("video", form.video);
      }

      await updatePitch(id, formData);
      alert("Pitch updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to update pitch", err);
      alert("Failed to update pitch. Please try again.");
    } finally {
      setSaving(false);
    }
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
        existingVideo={form.existingVideo}
      />

      <PitchFormFields form={form} update={update} />

      <TagInput tags={form.tags} setTags={(t) => update("tags", t)} />

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

    </div>
  );
}
