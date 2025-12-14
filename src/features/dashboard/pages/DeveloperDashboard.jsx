import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Upload } from "lucide-react";

import PitchRow from "../components/PitchRow";
import PitchCardMobile from "../components/PitchCardMobile";
import DeletePitchModal from "../components/DeletePitchModal";
import EmptyState from "../../../components/EmptyState";
import LoadingSpinner from "../../../components/LoadingSpinner";
import toast from 'react-hot-toast';

import { fetchMyPitches, deletePitch } from "../api/dashboardApi";

export default function DeveloperDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pitches, setPitches] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load real pitches
  useEffect(() => {
    if (!user) return;
    loadPitches();
  }, [user]);

  const loadPitches = async () => {
    try {
      setLoading(true);
      const data = await fetchMyPitches();
      setPitches(data);
    } catch (err) {
      toast.error("Failed to load pitches");
    } finally {
      setLoading(false);
    }
  };

  // DELETE HANDLER
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePitch(deleteId);
      setPitches(prev => prev.filter(p => p.id !== deleteId));
      setDeleteId(null);
      toast.success("Pitch deleted successfully");
    } catch (err) {
      toast.error("Failed to delete pitch");
    }
  };

  if (loading) {
    return <LoadingSpinner centered />;
  }

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

      {pitches.length === 0 ? (
        <EmptyState
          icon={Upload}
          title="No Pitches Yet"
          message="Showcase your startup to investors by uploading your first video pitch."
          actionLabel="Upload Pitch"
          actionPath="/upload"
        />
      ) : (
        <>
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
        </>
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
