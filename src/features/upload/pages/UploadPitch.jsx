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


import useUploadForm from "../hooks/useUploadForm";
import VideoUploader from "../components/VideoUploader";
import TagInput from "../components/TagInput";
import PitchFormFields from "../components/PitchFormFields";
import { uploadPitch } from "../api/uploadApi";
import { useNavigate } from "react-router-dom";

export default function UploadPitch() {
  const { form, update } = useUploadForm();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.video) return alert("Upload a pitch video");
    if (form.tags.length < 3) return alert("Add at least 3 tags");

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("description", form.description);
    payload.append("funding_stage", form.stage);
    payload.append("ask", form.ask);
    payload.append("video", form.video);

    // Django expects a JSON string for list fields
    payload.append("tags", JSON.stringify(form.tags));

    const response = await uploadPitch(payload);

    if (!response.success) {
      alert("Upload failed");
      return;
    }

    alert("Pitch uploaded successfully!");
    navigate(`/pitch/${response.data.id}`); // redirect to detail page
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-primary">Upload New Pitch</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <VideoUploader
          video={form.video}
          setVideo={(file) => update("video", file)}
        />

        <PitchFormFields form={form} update={update} />

        <TagInput tags={form.tags} setTags={(tags) => update("tags", tags)} />

        <button
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-opacity-90"
        >
          Upload Pitch
        </button>
      </form>
    </div>
  );
}
