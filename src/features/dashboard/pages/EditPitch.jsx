import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

import usePitchDetail from "../../pitchDetail/hooks/usePitchDetail";
import VideoUploader from "../../upload/components/VideoUploader";
import PitchFormFields from "../../upload/components/PitchFormFields";
import TagInput from "../../upload/components/TagInput";
import { updatePitch } from "../api/dashboardApi";
import LoadingButton from "../../../components/LoadingButton";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function EditPitch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pitch = usePitchDetail(id);

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pitch) {
      setForm({
        title: pitch.title,
        description: pitch.description,
        stage: pitch.funding_stage || pitch.stage,
        ask: pitch.ask,
        tags: Array.isArray(pitch.tags) ? pitch.tags : [],
        video: null,
        existingVideo: pitch.video_url,
        thumbnail: pitch.thumbnail
      });
    }
  }, [pitch]);

  const update = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.stage) newErrors.stage = "Funding stage is required";
    if (!form.ask) newErrors.ask = "Funding ask is required";

    if (form.tags.length < 3) {
      toast.error("Please add at least 3 tags");
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

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
      toast.success("Pitch updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to update pitch", err);
      toast.error("Failed to update pitch. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <div className="flex justify-center p-12"><LoadingSpinner /></div>;

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

      <PitchFormFields form={form} update={update} errors={errors} />

      <TagInput tags={form.tags} setTags={(t) => update("tags", t)} />

      <LoadingButton
        onClick={handleSave}
        loading={saving}
        className="w-full py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700"
      >
        Save Changes
      </LoadingButton>

    </div>
  );
}
