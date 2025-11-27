import { useParams } from "react-router-dom";

import usePitchDetail from "../hooks/usePitchDetail";

import PitchMeta from "../components/PitchMeta";
import PitchActions from "../components/PitchActions";

import ContactModal from "../../contact/components/ContachModal";
import useContactModal from "../../contact/hooks/useContactModal";

import useAuth from "../../../hooks/useAuth";

export default function PitchDetail() {
  const { id } = useParams();
  const pitch = usePitchDetail(id);

  const contact = useContactModal();
  const { savePitch, savedPitches } = useAuth();

  const isSaved = savedPitches?.includes(id);

  const handleSave = () => savePitch(pitch.id);

  const handleContactSubmit = (payload) => {
    console.log("CONTACT PAYLOAD → backend later", payload);
  };

  if (!pitch) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 bg-[#f9f9f9] min-h-screen">

      {/* GRID: mobile = 1 col, desktop = 2 cols */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

        {/* LEFT COLUMN → VIDEO */}
        <div className="w-full">

          <div className="w-full rounded-xl overflow-hidden bg-black/5">
            <video
              src={pitch.videoUrl}
              controls
              className="
                w-full 
                aspect-video 
                rounded-xl 
              "
            ></video>
          </div>

        </div>

        {/* RIGHT COLUMN → META + ACTIONS */}
        <div className="space-y-6">

          {/* META CARD */}
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

          {/* ACTIONS CARD */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <PitchActions
              views={pitch.views}
              saves={pitch.saves}
              saved={isSaved}
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
        onSubmit={handleContactSubmit}
        developer={pitch.developer}
      />

    </div>
  );
}
