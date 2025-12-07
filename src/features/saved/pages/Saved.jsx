import useAuth from "../../../hooks/useAuth";
import PitchCard from "../../feed/components/PitchCard";
import useFeedData from "../../feed/hooks/useFeedData";
import { Trash2 } from "lucide-react";

import useSavedPitches from "../hooks/useSavedPitches";

export default function Saved() {
  const savedPitches = useSavedPitches();
  const { removeSavedPitch } = useAuth();

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6">Saved Pitches</h1>

      {savedPitches.length === 0 && (
        <p className="text-gray-600 text-lg">You haven't saved any pitches yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {savedPitches.map((pitch) => (
          <div key={pitch.id} className="relative">
            <div className="relative scale-[0.90] sm:scale-[0.85] lg:scale-[0.80] origin-top-left">

              <PitchCard pitch={pitch} />

              <button
                onClick={() => removeSavedPitch(pitch.id)}
                className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full"
              >
                <Trash2 size={18} />
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
