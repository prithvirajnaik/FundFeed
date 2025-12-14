import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import usePitchDetail from "../hooks/usePitchDetail";

import PitchMeta from "../components/PitchMeta";
import PitchActions from "../components/PitchActions";

import ContactModal from "../../contact/components/ContactModal";
import useContactModal from "../../contact/hooks/useContactModal";

import useAuth from "../../../hooks/useAuth";

export default function PitchDetail() {
  const { id } = useParams();
  const initialPitch = usePitchDetail(id);

  const [pitch, setPitch] = useState(null);
  const contact = useContactModal();

  const { isSaved, toggleSavePitch } = useAuth();

  // Sync when API loads
  useEffect(() => {
    if (initialPitch) setPitch(initialPitch);
  }, [initialPitch]);

  if (!pitch) return <div className="p-10 text-center">Loading...</div>;

  const handleSave = async () => {
    const wasSaved = isSaved(pitch.id);

    await toggleSavePitch(pitch.id);

    // Live update count
    setPitch((prev) => ({
      ...prev,
      saves: wasSaved ? prev.saves - 1 : prev.saves + 1,
    }));
  };


  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 bg-[#f9f9f9] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

        {/* VIDEO */}
        <div className="w-full">
          <div className="w-full rounded-xl overflow-hidden bg-black/5">
            <video
              src={pitch.video_url}
              controls
              className="w-full aspect-video rounded-xl"
            ></video>
          </div>
        </div>

        {/* META + ACTIONS */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <PitchMeta
              title={pitch.title}
              description={pitch.description}
              tags={pitch.tags}
              developer={pitch.developer}
              views={pitch.views}
              saves={pitch.saves}
            />
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <PitchActions
              saved={isSaved(pitch.id)}
              saves={pitch.saves}
              onSave={handleSave}
              onContact={contact.openModal}
            />
          </div>
        </div>

      </div>

      {/* CONTACT MODAL */}
      <ContactModal
        open={contact.open}
        onClose={contact.closeModal}
        context={{ type: 'pitch', id: pitch.id }}
        recipientName={pitch.developer?.name}
      />

    </div>
  );
}
