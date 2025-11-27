import { useParams } from "react-router-dom";

import usePitchDetail from "../hooks/usePitchDetail";

import PitchMeta from "../components/PitchMeta";
import PitchActions from "../components/PitchActions";
import DeveloperCard from "../components/DeveloperCard";

import ContactModal from "../../contact/components/ContachModal";
import useContactModal from "../../contact/hooks/useContactModal";

import useAuth from "../../../hooks/useAuth";

export default function PitchDetail() {
  const { id } = useParams();
  const pitch = usePitchDetail(id);

  const contact = useContactModal();

  const { savePitch } = useAuth();

  const handleSave = () => {
    console.log("SAVE CLICKED → backend integration later");
    savePitch(pitch.id)
  };

  const handleContactSubmit = (payload) => {
    console.log("CONTACT PAYLOAD → backend later", payload);
  };

  if (!pitch) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Video Player */}
      <video
        src={pitch.videoUrl}
        controls
        className="w-full rounded-xl shadow-lg"
      ></video>

      {/* Metadata */}
      <PitchMeta
        title={pitch.title}
        description={pitch.description}
        tags={pitch.tags}
      />

      {/* Save + Contact + Metrics */}
      <PitchActions
        views={pitch.views}
        saves={pitch.saves}
        onSave={() => savePitch(pitch.id)}
        onContact={contact.openModal}
      />

      {/* Developer info */}
      <DeveloperCard developer={pitch.developer} />

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
