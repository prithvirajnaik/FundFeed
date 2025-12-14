// import useUploadForm from "../hooks/useUploadForm";

// import VideoUploader from "../components/VideoUploader";
// import TagInput from "../components/TagInput";
// import PitchFormFields from "../components/PitchFormFields";

// export default function UploadPitch() {
//   const { form, update } = useUploadForm();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!form.video) return alert("Upload a pitch video");
//     if (form.tags.length < 3) return alert("Add at least 3 tags");

//     // Backend-ready form object
//     const payload = new FormData();
//     payload.append("video", form.video);
//     payload.append("title", form.title);
//     payload.append("description", form.description);
//     payload.append("tags", form.tags) // Django accepts list directly
//     payload.append("stage", form.stage);
//     payload.append("ask", form.ask);

//     console.log("UPLOAD PAYLOAD → backend later:", payload);
//   api.post("/pitches/", payload, {
//     headers: { "Content-Type": "multipart/form-data" }
//   });

//     alert("Pitch ready to be uploaded!");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4 text-primary">
//         Upload New Pitch
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <VideoUploader
//           video={form.video}
//           setVideo={(file) => update("video", file)}
//         />

//         <PitchFormFields form={form} update={update} />

//         <TagInput
//           tags={form.tags}
//           setTags={(tags) => update("tags", tags)}
//         />

//         <button
//           type="submit"
//           className="w-full py-3 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-opacity-90"
//         >
//           Upload Pitch
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import useUploadForm from "../hooks/useUploadForm";
import VideoUploader from "../components/VideoUploader";
import TagInput from "../components/TagInput";
import PitchFormFields from "../components/PitchFormFields";
import { uploadPitch } from "../api/uploadApi";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../../components/LoadingButton";
import toast from 'react-hot-toast';

export default function UploadPitch() {
  const { form, update } = useUploadForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.video) {
      toast.error("Please upload a pitch video");
      return false;
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("description", form.description);
    payload.append("funding_stage", form.stage);
    payload.append("ask", form.ask);
    payload.append("video", form.video);
    payload.append("tags", JSON.stringify(form.tags));

    const response = await uploadPitch(payload);

    if (!response.success) {
      toast.error("Upload failed. Please try again.");
      setLoading(false);
      return;
    }

    toast.success("Pitch uploaded successfully!");
    navigate(`/pitch/${response.data.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-primary">Upload New Pitch</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <VideoUploader
          video={form.video}
          setVideo={(file) => update("video", file)}
        />

        <PitchFormFields form={form} update={update} errors={errors} />

        <TagInput tags={form.tags} setTags={(tags) => update("tags", tags)} />

        <LoadingButton
          type="submit"
          loading={loading}
          className="w-full py-3 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-opacity-90"
        >
          Upload Pitch
        </LoadingButton>
      </form>
    </div>
  );
}
