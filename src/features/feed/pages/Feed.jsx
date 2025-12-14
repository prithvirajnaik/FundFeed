import { useState, useEffect } from "react";
import { Search as SearchIcon, FileText } from "lucide-react";

import useAuth from "../../../hooks/useAuth";
import useRealFeed from "../hooks/userRealFeed";
import useInvestorPosts from "../../investor-posts/hooks/useInvestorPosts";
import useDebounce from "../../../hooks/useDebounce";

import PitchCard from "../components/PitchCard";
import InvestorPostCard from "../../investor-posts/components/InvestorPostCard";
import SearchBar from "../components/SearchBar";
import FeedFilters from "../components/FeedFilters";
import EmptyState from "../../../components/EmptyState";
import SkeletonCard from "../../../components/SkeletonCard";

import {
  saveInvestorPost,
  unsaveInvestorPost,
  getSavedInvestorPosts,
} from "../../investor-posts/api/investorPostsApi";

import toast from "react-hot-toast";

export default function Feed() {
  const { user } = useAuth();

  /* ---------------- SEARCH & FILTERS ---------------- */
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [filters, setFilters] = useState({
    tags: "",
    stage: "",
    location: "",
    role: "",
  });

  /* ---------------- DATA ---------------- */
  const { data: pitches, loading: pitchesLoading } =
    useRealFeed(debouncedSearch, filters);

  const { data: investorPosts, loading: postsLoading } =
    useInvestorPosts(debouncedSearch, filters);

  /* ---------------- TABS ---------------- */
  const [tab, setTab] = useState(
    user?.role === "developer" ? "investor_posts" : "pitches"
  );

  /* ---------------- SAVED INVESTOR POSTS ---------------- */
  const [savedPostIds, setSavedPostIds] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchSaved = async () => {
      try {
        const res = await getSavedInvestorPosts();
        setSavedPostIds(res.map(item => item.post.id));
      } catch {
        console.error("Failed to fetch saved posts");
      }
    };

    fetchSaved();
  }, [user]);

  const handleSavePost = async (postId) => {
    try {
      await saveInvestorPost(postId);
      setSavedPostIds(prev => [...prev, postId]);
      toast.success("Post saved");
    } catch {
      toast.error("Failed to save post");
    }
  };

  const handleUnsavePost = async (postId) => {
    try {
      await unsaveInvestorPost(postId);
      setSavedPostIds(prev => prev.filter(id => id !== postId));
      toast.success("Removed from saved");
    } catch {
      toast.error("Failed to remove post");
    }
  };

  /* ---------------- UI STATES ---------------- */
  const loading = tab === "pitches" ? pitchesLoading : postsLoading;
  const data = tab === "pitches" ? pitches : investorPosts;
  const isEmpty = !loading && data.length === 0;

  return (
    <div className="px-3 sm:px-6 max-w-7xl mx-auto bg-[#f9f9f9] min-h-screen">

      {/* SEARCH */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* FILTERS */}
      {/* <FeedFilters filters={filters} setFilters={setFilters} /> */}

      {/* TAB SWITCH */}
      <div className="flex gap-4 my-4">
        <button
          onClick={() => setTab("pitches")}
          className={`px-3 py-1 rounded-lg ${tab === "pitches"
            ? "text-orange-600 font-semibold"
            : "text-gray-600"
            }`}
        >
          Pitches
        </button>

        <button
          onClick={() => setTab("investor_posts")}
          className={`px-3 py-1 rounded-lg ${tab === "investor_posts"
            ? "text-orange-600 font-semibold"
            : "text-gray-600"
            }`}
        >
          Investor Posts
        </button>
      </div>

      {/* GRID */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isEmpty ? (
          <EmptyState
            icon={tab === "pitches" ? SearchIcon : FileText}
            title={
              tab === "pitches"
                ? "No pitches found"
                : "No investor posts found"
            }
            message={
              debouncedSearch || filters.tags || filters.stage
                ? "Try adjusting your search or filters."
                : tab === "pitches"
                  ? "Be the first to upload a pitch!"
                  : "No investor posts available yet."
            }
            actionLabel={
              debouncedSearch || filters.tags || filters.stage
                ? "Clear Filters"
                : null
            }
            onAction={() => {
              setSearch("");
              setFilters({
                tags: "",
                stage: "",
                location: "",
                role: "",
              });
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* PITCHES */}
            {tab === "pitches" &&
              pitches.map(pitch => (
                <PitchCard key={pitch.id} pitch={pitch} />
              ))}

            {/* INVESTOR POSTS */}
            {tab === "investor_posts" &&
              investorPosts.map(post => (
                <InvestorPostCard
                  key={post.id}
                  post={post}
                  saved={savedPostIds.includes(post.id)}
                  onSave={handleSavePost}
                  onUnsave={handleUnsavePost}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
