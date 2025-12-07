import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import PitchCard from "../../feed/components/PitchCard";
import InvestorPostCard from "../../investor-posts/components/InvestorPostCard";
import useSavedPitches from "../hooks/useSavedPitches";
import api from "../../../api/apiClient";
import { Trash2 } from "lucide-react";
import { unsaveInvestorPost } from "../../investor-posts/api/investorPostsApi";

export default function Saved() {
  const { user, removeSavedPitch } = useAuth();
  const savedPitches = useSavedPitches();
  const [savedPosts, setSavedPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [tab, setTab] = useState("pitches");

  useEffect(() => {
    if (user) {
      fetchSavedPosts();
    }
  }, [user]);

  const fetchSavedPosts = async () => {
    try {
      const response = await api.get("/api/investor-posts/saved/");
      const posts = response.data.map(item => item.post);
      setSavedPosts(posts);
    } catch (err) {
      console.error("Failed to fetch saved posts", err);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleUnsavePost = async (postId) => {
    try {
      await unsaveInvestorPost(postId);
      setSavedPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      console.error("Failed to unsave post", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6">Saved Items</h1>

      {/* TABS */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 pb-1">
        <button
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${tab === "pitches" ? "text-orange-600" : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setTab("pitches")}
        >
          Saved Pitches
          {tab === "pitches" && (
            <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-orange-600 rounded-t-full"></span>
          )}
        </button>

        <button
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${tab === "posts" ? "text-orange-600" : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setTab("posts")}
        >
          Saved Investor Posts
          {tab === "posts" && (
            <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-orange-600 rounded-t-full"></span>
          )}
        </button>
      </div>

      {/* CONTENT */}
      <div>
        {/* SAVED PITCHES TAB */}
        {tab === "pitches" && (
          <div>
            {savedPitches.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500">You haven't saved any pitches yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                {savedPitches.map((pitch) => (
                  <div key={pitch.id} className="relative">
                    <div className="relative scale-[0.90] sm:scale-[0.85] lg:scale-[0.80] origin-top-left">
                      <PitchCard pitch={pitch} />
                      <button
                        onClick={() => removeSavedPitch(pitch.id)}
                        className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED POSTS TAB */}
        {tab === "posts" && (
          <div>
            {loadingPosts ? (
              <div className="text-center py-12">Loading...</div>
            ) : savedPosts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500">You haven't saved any investor posts yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {savedPosts.map((post) => (
                  <div key={post.id} className="relative group">
                    <InvestorPostCard
                      post={post}
                      saved={true}
                      onSave={() => handleUnsavePost(post.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
