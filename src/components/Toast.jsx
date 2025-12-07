import { useEffect, useState } from "react";

export default function Toast({ message, onClose }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Start closing animation before remove
    const t = setTimeout(() => setClosing(true), 1800);
    const t2 = setTimeout(onClose, 2300); // remove after animation ends
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className={`
        fixed
        right-5 top-10                 /* moved slightly downward */
        z-[9999]

        px-4 py-2
        bg-white text-black            /* clean white toast */
        rounded-xl shadow-xl
        backdrop-blur-md

        flex items-center

        transition-all duration-500
        ${closing ? "animate-toastSlideOut" : "animate-toastSlideIn"}
      `}
      style={{ maxWidth: "80vw" }}
    >
      {message}
    </div>
  );
}
