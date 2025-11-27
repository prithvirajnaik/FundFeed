import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import PitchRow from "../components/PitchRow";
import PitchCardMobile from "../components/PitchCardMobile";

import DeletePitchModal from "../components/DeletePitchModal";

export default function DeveloperDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pitches, setPitches] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  // ✔ MOCK DATA (no backend yet)
  const mockPitches = [
    {
      id: "p1",
      title: "AI Fitness Coach",
      thumbnail: "https://picsum.photos/300/180",
      views: 1540,
      saves: 122,
      stage: "Seed",
      tags: ["AI", "Fitness"],       // REQUIRED for edit page
      description: "Short desc",
      ask: "$20k",
      videoUrl: "",                  // safe
    },
    {
      id: "p2",
      title: "Fintech Fraud Detector",
      thumbnail: "https://picsum.photos/300/181",
      views: 890,
      saves: 45,
      stage: "Pre-seed",
      tags: ["Fintech"],
      description: "Short desc",
      ask: "$50k",
      videoUrl: "",
    },
    {
      id: "p3",
      title: "Voice-based Note App",
      thumbnail: "https://picsum.photos/300/182",
      views: 2200,
      saves: 340,
      stage: "Series A",
      tags: ["Voice", "SaaS"],
      description: "Short desc",
      ask: "$10k",
      videoUrl: "",
    },
  ];

  // Load mock pitches
  useEffect(() => {
    if (!user) return;
    setPitches(mockPitches);
  }, [user]);

  // DELETE HANDLER (mock)
  const handleDelete = async () => {
    setPitches(prev => prev.filter(p => p.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-[#f9f9f9] min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f0f0f]">
          My Pitches
        </h1>

        <Link
          to="/upload"
          className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700"
        >
          + Upload New
        </Link>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-6 font-semibold p-4 border-b text-gray-600 text-sm">
          <div className="col-span-2">Pitch</div>
          <div>Views</div>
          <div>Saves</div>
          <div>Stage</div>
          <div>Actions</div>
        </div>

        {pitches.map(pitch => (
          <PitchRow
            key={pitch.id}
            pitch={pitch}
            onEdit={() => navigate(`/edit/${pitch.id}`)}
            onDelete={() => setDeleteId(pitch.id)}
          />
        ))}
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden grid gap-4">
        {pitches.map(pitch => (
          <PitchCardMobile
            key={pitch.id}
            pitch={pitch}
            onEdit={() => navigate(`/edit/${pitch.id}`)}
            onDelete={() => setDeleteId(pitch.id)}
          />
        ))}
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <DeletePitchModal
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}

    </div>
  );
}
