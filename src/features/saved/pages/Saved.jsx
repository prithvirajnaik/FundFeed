import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import PitchCard from "../../feed/components/PitchCard";
import InvestorPostCard from "../../investor-posts/components/InvestorPostCard";
import useSavedPitches from "../hooks/useSavedPitches";
import api from "../../../api/apiClient";
import { Trash2, Bookmark, FolderOpen } from "lucide-react";
import { unsaveInvestorPost } from "../../investor-posts/api/investorPostsApi";
import EmptyState from "../../../components/EmptyState";
import LoadingSpinner from "../../../components/LoadingSpinner";
import toast from "react-hot-toast";

export default function Saved() {
  const { user, removeSavedPitch } = useAuth();

  /** ---------------- SAVED PITCHES ---------------- */
  const savedPitches = useSavedPitches();
  const [localSavedPitches, setLocalSavedPitches] = useState([]);

  useEffect(() => {
    setLocalSavedPitches(savedPitches);
  }, [savedPitches]);

  const handleRemovePitch = async (pitchId) => {
    try {
      await removeSavedPitch(pitchId);
      setLocalSavedPitches(prev =>
        prev.filter(p => p.id !== pitchId)
      );
      toast.success("Removed from saved pitches");
    } catch {
      toast.error("Failed to remove pitch");
    }
  };

  /** ---------------- SAVED POSTS ---------------- */
  const [savedPosts, setSavedPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSavedPosts();
    }
  }, [user]);

  const fetchSavedPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await api.get("/api/investor-posts/saved/");
      setSavedPosts(res.data.map(item => item.post));
    } catch {
      toast.error("Failed to load saved posts");
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleUnsavePost = async (postId) => {
    try {
      await unsaveInvestorPost(postId);
      setSavedPosts(prev => prev.filter(p => p.id !== postId));
      toast.success("Removed from saved posts");
    } catch {
      toast.error("Failed to remove post");
    }
  };

  /** ---------------- UI STATE ---------------- */
  const [tab, setTab] = useState("pitches");

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6">Saved Items</h1>

      {/* TABS */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 pb-1">
        {["pitches", "posts"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium relative ${tab === t ? "text-orange-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {t === "pitches" ? "Saved Pitches" : "Saved Investor Posts"}
            {tab === t && (
              <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-orange-600" />
            )}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {tab === "pitches" && (
        <>
          {localSavedPitches.length === 0 ? (
            <EmptyState
              icon={Bookmark}
              title="No saved pitches yet"
              message="Pitches you save will appear here."
              actionLabel="Explore Pitches"
              actionPath="/feed"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {localSavedPitches.map(pitch => (
                <div key={pitch.id} className="relative">
                  <PitchCard pitch={pitch} />
                  <button
                    onClick={() => handleRemovePitch(pitch.id)}
                    className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full hover:bg-black"
                    title="Remove from saved"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "posts" && (
        <>
          {loadingPosts ? (
            <LoadingSpinner centered />
          ) : savedPosts.length === 0 ? (
            <EmptyState
              icon={FolderOpen}
              title="No saved investor posts"
              message="Investor posts you save will appear here."
              actionLabel="Explore Posts"
              actionPath="/investor-posts"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {savedPosts.map(post => (
                <InvestorPostCard
                  key={post.id}
                  post={post}
                  saved
                  onUnsave={() => handleUnsavePost(post.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
