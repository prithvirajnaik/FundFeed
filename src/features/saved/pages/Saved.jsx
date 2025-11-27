import useAuth from "../../../hooks/useAuth";
import PitchCard from "../../feed/components/PitchCard";
import useFeedData from "../../feed/hooks/useFeedData";

export default function Saved() {
  const { user, removeSavedPitch } = useAuth();
  const feed = useFeedData(); // we reuse feed mock (later real API)

    const savedIds = (user?.savedPitches || []).map(String);

    const savedPitches = feed.filter((p) =>
    savedIds.includes(String(p.id))
    );


  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6 text-primary">Saved Pitches</h1>

      {savedPitches.length === 0 && (
        <p className="text-gray-600 text-lg">You haven't saved any pitches yet.</p>
      )}

      <div className="grid gap-6">
        {savedPitches.map((pitch) => (
          <div key={pitch.id} className="relative">
            
            <PitchCard pitch={pitch} />

            {/* Remove button */}
            <button
              onClick={() => removeSavedPitch(pitch.id)}
              className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full hover:bg-opacity-90"
            >
              Remove
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}
