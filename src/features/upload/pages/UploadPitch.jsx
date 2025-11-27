import useUploadForm from "../hooks/useUploadForm";

import VideoUploader from "../components/VideoUploader";
import TagInput from "../components/TagInput";
import PitchFormFields from "../components/PitchFormFields";

export default function UploadPitch() {
  const { form, update } = useUploadForm();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.video) return alert("Upload a pitch video");
    if (form.tags.length < 3) return alert("Add at least 3 tags");

    // Backend-ready form object
    const payload = new FormData();
    payload.append("video", form.video);
    payload.append("title", form.title);
    payload.append("description", form.description);
    payload.append("tags", JSON.stringify(form.tags));
    payload.append("stage", form.stage);
    payload.append("ask", form.ask);

    console.log("UPLOAD PAYLOAD → backend later:", payload);

    alert("Pitch ready to be uploaded!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-primary">
        Upload New Pitch
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <VideoUploader
          video={form.video}
          setVideo={(file) => update("video", file)}
        />

        <PitchFormFields form={form} update={update} />

        <TagInput
          tags={form.tags}
          setTags={(tags) => update("tags", tags)}
        />

        <button
          type="submit"
          className="w-full py-3 bg-accent text-white rounded-lg text-lg font-semibold hover:bg-opacity-90"
        >
          Upload Pitch
        </button>
      </form>
    </div>
  );
}
