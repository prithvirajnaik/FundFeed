import { useRef } from "react";

export default function VideoPreview({ src, thumbnail }) {
  const videoRef = useRef(null);

  const playPreview = () => {
    videoRef.current.play();
  };

  const stopPreview = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div
      className="relative w-full h-60 rounded-lg overflow-hidden bg-black transition-all duration-200 hover:rounded-none     "
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        className="w-full h-full object-cover"
        poster={thumbnail}
      />
    </div>
  );
}
