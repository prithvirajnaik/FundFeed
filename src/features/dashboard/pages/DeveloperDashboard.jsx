import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// import api from "../api/apiClient";

import PitchRow from "../components/PitchRow";
import PitchCardMobile from "../components/PitchCardMobile";

import EditPitchModal from "../components/EditPitchModal";
import DeletePitchModal from "../components/DeletePitchModal";

export default function DeveloperDashboard() {
  const { user } = useAuth();
  const [pitches, setPitches] = useState([]);

  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  // ✔ MOCK DATA (no backend)
  const mockPitches = [
    {
      id: "p1",
      title: "AI Fitness Coach",
      thumbnail: "https://picsum.photos/300/180",
      views: 1540,
      saves: 122,
      stage: "Seed",
    },
    {
      id: "p2",
      title: "Fintech Fraud Detector",
      thumbnail: "https://picsum.photos/300/181",
      views: 890,
      saves: 45,
      stage: "Pre-seed",
    },
    {
      id: "p3",
      title: "Voice-based Note App",
      thumbnail: "https://picsum.photos/300/182",
      views: 2200,
      saves: 340,
      stage: "Series A",
    },
  ];
  // Fetch pitches for logged-in developer
  useEffect(() => {
    if (!user) return;

    // Replace with backend: /pitches/developer/:id
    // api.get(`/pitches?developerId=${user.id}`).then(res => {
    //   setPitches(res.data || []);
    // });
     setPitches(mockPitches);

  }, [user]);

  const refresh = () => {
    api.get(`/pitches?developerId=${user.id}`).then(res => {
      setPitches(res.data || []);
    });
  };

  const handleSaveEdit = async (updated) => {
    await api.patch(`/pitches/${editData.id}`, updated);
    setEditData(null);
    refresh();
  };

  const handleDelete = async () => {
    await api.delete(`/pitches/${deleteId}`);
    setPitches(prev => prev.filter(p => p.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-[#f9f9f9] min-h-screen">

      {/* TITLE + UPLOAD BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f0f0f]">
          My Pitches
        </h1>

        <Link
          to="/upload"
          className="
            bg-orange-600 text-white px-4 py-2 
            rounded-lg font-semibold hover:bg-orange-700
          "
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
            onEdit={() => setEditData(pitch)}
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
            onEdit={() => setEditData(pitch)}
            onDelete={() => setDeleteId(pitch.id)}
          />
        ))}
      </div>

      {/* EDIT MODAL */}
      {editData && (
        <EditPitchModal
          pitch={editData}
          onClose={() => setEditData(null)}
          onSave={handleSaveEdit}
        />
      )}

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
