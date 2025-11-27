import { useRef, useState } from "react";
/*
Supports:
    Video validation
    Size limit
    Duration limit (90s)
    Instant preview
    Backend-ready file object 
*/


export default function VideoUploader({ video, setVideo }) {
  const fileRef = useRef(null);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation
    if (!["video/mp4", "video/quicktime"].includes(file.type)) {
      return setError("Only MP4 or MOV files allowed");
    }

    if (file.size > 50 * 1024 * 1024) {
      return setError("Maximum file size is 50MB");
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    const videoEl = document.createElement("video");
    videoEl.src = url;

    videoEl.onloadedmetadata = () => {
      if (videoEl.duration > 90) {
        setError("Video must be under 90 seconds");
      } else {
        setError(null);
        setPreview(url);
        setVideo(file);
      }
    };
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <p className="font-semibold mb-2">Upload Pitch Video</p>

      {preview ? (
        <video
          src={preview}
          controls
          className="w-full rounded-lg mb-3"
        ></video>
      ) : (
        <div
          className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 cursor-pointer"
          onClick={() => fileRef.current.click()}
        >
          Click to upload video
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <input
        type="file"
        accept="video/mp4,video/quicktime"
        className="hidden"
        ref={fileRef}
        onChange={handleFile}
      />
    </div>
  );
}
